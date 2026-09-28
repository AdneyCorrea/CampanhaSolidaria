# Campanha Solidária

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
