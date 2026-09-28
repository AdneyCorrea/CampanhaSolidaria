# Campanha Solidária

Plataforma front-end demonstrativa de uma organização social fictícia para divulgar iniciativas, captar interesse de voluntários e explicar formas de apoio.

## Tecnologias

- HTML5 semântico, CSS3 responsivo e JavaScript ES Modules
- Vite 6 para desenvolvimento e build de produção
- SVG para ilustração, logótipo e favicon

## Requisitos e execução

Requer Node.js 18+ e pnpm.

```bash
pnpm install
pnpm dev
```

O Vite informa o endereço local no terminal.

## Build e preview

```bash
pnpm build
pnpm preview
```

A build minificada é criada em `dist/`.

## Deploy

O workflow `.github/workflows/deploy.yml` constrói e publica `dist/` no GitHub Pages após push para `main` ou execução manual. Em **Settings → Pages**, escolha **GitHub Actions** como fonte.

## Estrutura

- `html/`: páginas principais
- `assets/css/`, `assets/js/`, `assets/images/`: estilos, módulos e recursos visuais
- `vite.config.js`: configuração de build
- `dist/`: saída gerada; não editar manualmente

O formulário é demonstrativo e não envia dados para um servidor.