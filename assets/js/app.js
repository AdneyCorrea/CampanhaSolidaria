(() => {
  const main = document.querySelector('#conteudo');
  if (!main || !window.fetch || !window.history.pushState) return;

  const currentFolder = new URL('.', window.location.href);
  const getLocalPageLink = (anchor) => {
    if (!anchor || anchor.target || anchor.hasAttribute('download')) return null;
    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin || !url.pathname.endsWith('.html')) return null;
    if (!url.pathname.startsWith(currentFolder.pathname)) return null;
    return url;
  };

  const updateNavigation = () => {
    document.querySelectorAll('.site-header nav a').forEach((link) => {
      const url = new URL(link.href, window.location.href);
      if (url.pathname === window.location.pathname) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const initializePageScripts = () => {
    document.querySelectorAll('script[data-spa-page-script]').forEach((script) => script.remove());
    const pageScripts = [];
    if (document.querySelector('#cadastro-form')) pageScripts.push(['cadastro', '../assets/js/form.js']);
    if (document.querySelector('#project-list')) pageScripts.push(['projetos', '../assets/js/project-cards.js']);
    pageScripts.forEach(([page, source]) => {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = source;
      script.dataset.spaPageScript = page;
      document.body.append(script);
    });
  };

  const renderRoute = async (url, { addHistory = false, restoreScroll = true } = {}) => {
    try {
      const response = await fetch(url.href, { headers: { 'X-Requested-With': 'SPA' } });
      if (!response.ok) throw new Error(`Falha ao carregar a página (${response.status}).`);
      const documentText = await response.text();
      const nextDocument = new DOMParser().parseFromString(documentText, 'text/html');
      const nextMain = nextDocument.querySelector('#conteudo');
      if (!nextMain) throw new Error('A página não contém a região principal esperada.');

      main.innerHTML = nextMain.innerHTML;
      document.title = nextDocument.title;
      const nextDescription = nextDocument.querySelector('meta[name="description"]')?.content;
      const description = document.querySelector('meta[name="description"]');
      if (description && nextDescription) description.content = nextDescription;
      if (addHistory) window.history.pushState({ spa: true }, '', url.href);
      updateNavigation();
      initializePageScripts();

      const heading = main.querySelector('h1');
      if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
      if (restoreScroll) window.scrollTo({ top: 0, behavior: 'instant' });
      return true;
    } catch (error) {
      console.warn('A navegação SPA não pôde carregar a página; usando navegação padrão.', error);
      return false;
    }
  };

  document.addEventListener('click', async (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = event.target.closest('a[href]');
    const url = getLocalPageLink(anchor);
    if (!url || url.pathname === window.location.pathname) return;
    event.preventDefault();
    const rendered = await renderRoute(url, { addHistory: true });
    if (!rendered) window.location.assign(url.href);
  });

  window.addEventListener('popstate', async () => {
    const rendered = await renderRoute(new URL(window.location.href), { restoreScroll: true });
    if (!rendered) window.location.reload();
  });

  updateNavigation();
})();
