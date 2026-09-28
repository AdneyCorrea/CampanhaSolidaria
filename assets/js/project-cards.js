export function initializeProjectCards() {
  const list = document.querySelector('#project-list');
  const template = document.querySelector('#project-card-template');
  if (!list || !template) return;

  // Fonte de dados dos cards: o conteúdo pode ser atualizado sem duplicar HTML.
  const projects = [
    {
      number: '01', category: 'Segurança alimentar', title: 'Mesa Compartilhada',
      description: 'Uma rede de arrecadação e distribuição de alimentos, formada com apoio de moradores e parceiros locais.',
      badges: [{ label: 'Doação', color: 'green' }, { label: 'Ação comunitária', color: 'orange' }],
      actions: ['Contribua com alimentos não perecíveis em campanhas presenciais.', 'Ajude na organização e separação das cestas.', 'Compartilhe a campanha com sua rede.']
    },
    {
      number: '02', category: 'Educação e cultura', title: 'Roda de Aprender',
      description: 'Encontros de leitura, atividades criativas e troca de conhecimentos para crianças e jovens.',
      badges: [{ label: 'Educação', color: 'blue' }, { label: 'Voluntariado', color: 'green' }],
      actions: ['Doe livros infantis e materiais de arte em bom estado.', 'Ofereça seu tempo para leitura ou oficinas.', 'Ajude a preparar o espaço para os encontros.']
    },
    {
      number: '03', category: 'Convivência comunitária', title: 'Laços do Bairro',
      description: 'Ações coletivas que valorizam espaços comuns, promovem convivência e conectam iniciativas locais.',
      badges: [{ label: 'Comunidade', color: 'purple' }, { label: 'Voluntariado', color: 'green' }],
      actions: ['Participe de mutirões e encontros comunitários.', 'Compartilhe habilidades de jardinagem, comunicação ou organização.', 'Indique parceiros e espaços para novas atividades.']
    }
  ];

  const fragment = document.createDocumentFragment();
  projects.forEach((project) => {
    const card = template.content.cloneNode(true);
    card.querySelector('.project-number').textContent = project.number;
    card.querySelector('.project-category').textContent = project.category;
    card.querySelector('.project-title').textContent = project.title;
    card.querySelector('.project-description').textContent = project.description;

    const badges = card.querySelector('.badge-list');
    project.badges.forEach(({ label, color }) => {
      const badge = document.createElement('span');
      badge.className = `badge badge-${color}`;
      badge.textContent = label;
      badges.append(badge);
    });

    const actions = card.querySelector('.project-actions');
    project.actions.forEach((action) => {
      const item = document.createElement('li');
      item.textContent = action;
      actions.append(item);
    });
    fragment.append(card);
  });
  list.replaceChildren(fragment);
}
