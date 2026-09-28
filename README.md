# Campanha Solidária

<<<<<<< HEAD
Plataforma front-end demonstrativa de uma organização social fictícia. O site apresenta iniciativas comunitárias, explica como apoiar as campanhas e oferece um formulário de interesse para voluntariado e parcerias.

## Tecnologias

- HTML5 semântico e CSS3 responsivo
- JavaScript ES Modules para navegação SPA, componentes e validação de formulário
- Vite 6 para desenvolvimento local e build de produção
- SVG para a ilustração principal, com PNG e WebP mantidos como assets alternativos no projeto

## Requisitos

- Node.js 18 ou superior
- pnpm

## Instalação e execução local

```bash
pnpm install
pnpm dev
```

O Vite informa no terminal o endereço local para abrir no navegador.

## Build de produção

```bash
pnpm build
pnpm preview
```

O comando `pnpm build` minifica HTML, CSS e JavaScript e grava a versão pronta para hospedagem na pasta `dist/`. `pnpm preview` serve essa versão localmente para conferência antes do deploy. Publique o conteúdo de `dist/` no serviço de hospedagem escolhido.

## Deploy no GitHub Pages

O workflow `.github/workflows/deploy.yml` constrói o site e publica o conteúdo de `dist/` no GitHub Pages sempre que há um push para `main`, ou quando o workflow é iniciado manualmente. No GitHub, abra **Settings → Pages** e selecione **GitHub Actions** como fonte de publicação. Depois que o workflow concluir com sucesso, o endereço do site ficará visível na página do repositório e na execução do workflow.

## Estrutura principal

```text
assets/       estilos, imagens e módulos JavaScript
html/         páginas principais do site
index.html    entrada da hospedagem que encaminha para o site
vite.config.js configuração da build
```

Os arquivos-fonte das páginas principais estão em `html/`. A pasta `dist/` e `node_modules/` são geradas localmente e não devem ser editadas manualmente.

## Observações

Este é um projeto acadêmico demonstrativo: os dados do formulário não são enviados para um servidor. As preferências de participação são armazenadas localmente no navegador.
=======
> Plataforma web demonstrativa para apresentar iniciativas sociais e facilitar o contato de pessoas interessadas em apoiar uma organização comunitária fictícia.

**Projeto acadêmico de Desenvolvimento Front-end e Engenharia de Software.** O foco está em HTML semântico, CSS responsivo, JavaScript modular, acessibilidade e organização do código.

## Sobre o projeto

A Campanha Solidária reúne informações institucionais, projetos comunitários e um formulário de interesse em um site leve, sem servidor de aplicação. A organização, as iniciativas e os contatos são fictícios e servem para fins didáticos.

### Páginas

- **Início** (`html/index.html`): apresentação da organização, frentes de atuação e contato.
- **Projetos** (`html/projetos.html`): iniciativas sociais, formas de apoio e categorias identificadas por etiquetas.
- **Cadastro** (`html/cadastro.html`): formulário demonstrativo para manifestar interesse em voluntariado, doação ou parceria.

### Funcionalidades

- Navegação SPA entre páginas internas, com atualização do conteúdo principal e suporte aos botões voltar e avançar.
- Cards de projetos gerados por JavaScript a partir de um elemento HTML `<template>` e de uma lista de dados.
- Máscaras e validações de CPF, telefone e CEP, além de mensagens de erro e sucesso no formulário.
- Preferências de participação salvas no `localStorage` e restauradas em visitas posteriores.
- Etiquetas de categoria, aviso informativo e notificação toast.
- Layout responsivo, navegação por teclado, link para saltar ao conteúdo e textos alternativos nas imagens.

## Tecnologias

- HTML5 semântico
- CSS3, Grid, Flexbox e media queries
- JavaScript moderno: ES Modules, DOM, Fetch API, History API e Web Storage
- SVG, PNG e WebP para recursos gráficos

Não há framework JavaScript nem pacotes para instalar. As fontes Manrope e DM Sans são carregadas do Google Fonts; sem conexão, são usadas fontes alternativas do sistema.

## Estrutura do projeto

```text
CampanhaSolidaria/
├── README.md
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── images/
│   │   ├── comunidade.svg
│   │   ├── comunidade.png
│   │   ├── comunidade.webp
│   │   ├── favicon.svg
│   │   └── logo.svg
│   └── js/
│       ├── app.js
│       ├── form.js
│       ├── project-cards.js
│       └── storage.js
└── html/
    ├── cadastro.html
    ├── index.html
    └── projetos.html
```

### Organização do JavaScript

- `app.js` intercepta links internos, carrega páginas e atualiza o histórico de navegação.
- `project-cards.js` preenche o template dos cards com os dados das iniciativas.
- `form.js` controla eventos, máscaras, validações e mensagens do formulário.
- `storage.js` exporta funções para salvar e recuperar as opções de participação.

## Como executar localmente

A navegação SPA usa `fetch`; por isso, sirva os arquivos em HTTP em vez de abrir a página diretamente como `file://`.

### Usando Python

No PowerShell, na pasta do projeto:

```powershell
cd C:\Projetos\CampanhaSolidaria
py -m http.server 5500
```

Abra <http://localhost:5500/html/index.html>. Para encerrar o servidor, pressione `Ctrl+C` no terminal.

### Usando Visual Studio Code

Abra a pasta do projeto no VS Code, inicie um servidor estático, por exemplo com a extensão Live Server, e abra `html/index.html` por esse servidor.

## Formulário e privacidade

O formulário é demonstrativo: não envia dados para um servidor e não processa doações reais. As opções de participação selecionadas são armazenadas localmente no navegador. CPF, telefone, data de nascimento e endereço não são gravados no `localStorage`. Não use dados pessoais reais neste projeto.

## Validação e acessibilidade

Os três documentos HTML foram verificados pelo Nu HTML Checker do W3C e não apresentaram mensagens na verificação realizada. Também foram conferidas a sintaxe dos scripts e as referências locais. Essas verificações não equivalem a uma auditoria completa WCAG; recomenda-se testar manualmente com teclado, leitor de tela, navegadores e tamanhos de tela diferentes.

## Fluxo de versionamento sugerido

- `main`: versões estáveis.
- `develop`: integração de funcionalidades em desenvolvimento.
- `feature/<assunto>`: desenvolvimento isolado de cada funcionalidade, com integração em `develop` após revisão.
- `hotfix/<assunto>`: correções urgentes iniciadas em `main` e integradas também em `develop`.

Use mensagens no padrão Conventional Commits, como `feat: add project cards` e `docs: update setup instructions`. Tags de release podem seguir SemVer, por exemplo `v1.0.0` para a primeira versão estável.
>>>>>>> 221bf8da15c5bb627cdf01c78a8cebe8df6af932
