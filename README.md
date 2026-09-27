# Campanha Solidária

Projeto acadêmico demonstrativo de uma plataforma front-end para divulgação de iniciativas de uma organização social fictícia.

## Estrutura

- `html/`: páginas `index.html`, `projetos.html` e `cadastro.html`.
- `assets/css/`: estilos e componentes visuais.
- `assets/images/`: logotipo, favicon e ilustrações em SVG, PNG e WebP.
- `assets/js/`: roteador SPA (`app.js`), renderização de cards (`project-cards.js`), formulário (`form.js`) e persistência (`storage.js`).

## Execução

Sirva a pasta do projeto em um servidor HTTP estático e abra `/html/index.html`. O roteamento SPA usa `fetch`, que pode ser bloqueado quando as páginas são abertas diretamente pelo protocolo `file://`. Não há servidor de aplicação nem armazenamento remoto; as opções de participação selecionadas são salvas localmente no navegador.

## Fluxo GitFlow

- `main`: versões estáveis e prontas para entrega.
- `develop`: integração das funcionalidades em desenvolvimento.
- `feature/<nome>`: branches curtas para funcionalidades ou documentação; são integradas em `develop` após revisão.
- `hotfix/<nome>`: correções urgentes preparadas a partir de `main` e integradas de volta em `main` e `develop`.

Use mensagens de commit semânticas, por exemplo `feat: add SPA navigation` ou `docs: document project setup`.

## Acessibilidade e validação

As páginas usam HTML semântico, rótulos de formulário, mensagens associadas aos campos e regiões de status acessíveis. Os documentos HTML foram verificados com o Nu HTML Checker. A verificação automatizada não substitui testes manuais com teclado, leitor de tela e diferentes navegadores.
