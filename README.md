# Alexandre Jackson Corrêa

Portfólio estático de Alexandre Jackson Corrêa, desenvolvedor NetSuite / SuiteScript. O site é [Astro](https://astro.build) com TypeScript, gera HTML estático e publica em [https://alexandred3v.github.io](https://alexandred3v.github.io) pelo GitHub Pages.

O idioma da interface é **pt-BR**. Os textos editáveis ficam num único arquivo para uma versão em inglês poder entrar depois sem espalhar frases pelo layout.

## Antes do primeiro deploy

No repositório, abra **Settings > Pages > Source** e escolha **GitHub Actions**.

O caminho na tela atual do GitHub é **Settings → Pages → Build and deployment → Source → GitHub Actions**. Sem isso o workflow não consegue publicar. O `GITHUB_TOKEN` do Actions não tem permissão para ligar o Pages sozinho.

## Editar o conteúdo

Quase tudo que é pessoal está em [`src/data/site.ts`](src/data/site.ts):

| O que mudar | Onde |
| --- | --- |
| E-mail | `profile.email` — hoje é o placeholder `COLOQUE_SEU_EMAIL_AQUI@exemplo.com` |
| Bio | `content['pt-BR'].hero.bio` e apague `bioNote` quando o texto for o definitivo |
| Currículo | coloque o PDF em `public/cv.pdf` e defina `profile.cvUrl` como `'/cv.pdf'` |
| Selo “disponível para projetos” | `profile.availableForProjects` |
| Links | `profile.github` e `profile.linkedin` |
| Extensão em destaque | `profile.featuredExtension` e `content['pt-BR'].projects.featuredSummary` |
| Ordem dos repositórios | `profile.priorityRepos` |
| Lista usada se a API do GitHub falhar | `profile.fallbackRepos` |
| Skills | `content['pt-BR'].skills.groups` |
| Formação e experiência | `content['pt-BR'].timeline.items` — TADS no IFSP está lá; período, campus e cargos são placeholders |
| Textos de botões, navegação e contato | o restante de `content['pt-BR']` |

Foto atual: avatar do GitHub em `profile.avatarUrl` (`https://avatars.githubusercontent.com/u/66167971?v=4`). Troque a URL quando tiver outra imagem.

O nome da extensão no card é exatamente **Netsuite - JS Snippets Reload**. Instalações, nota e versão vêm do VS Code Marketplace no momento do build. A grade de projetos vem da API pública do GitHub: sem forks e sem repositórios arquivados, com a lista `priorityRepos` na frente.

Se uma dessas APIs falhar, o build continua. A extensão aparece sem os números e a grade usa `fallbackRepos`.

### Blog

Os textos ficam em `src/content/blog/*.md`. O arquivo `como-publicar-um-texto.md` é um rascunho (`draft: true`) e **não entra no site**. Para publicar, copie o arquivo, ajuste o front matter e remova `draft` ou use `draft: false`.

### Versão em inglês

1. Em `src/data/site.ts`, adicione a chave `en` dentro de `content`. O helper `defineContent` exige o mesmo formato de `pt-BR` (`htmlLang`, `ogLocale`, navegação, seções).
2. Crie `src/pages/en/index.astro` copiando `src/pages/index.astro` e trocando `content[defaultLocale]` por `content.en`.
3. Os componentes já recebem o objeto `copy`, então o layout não precisa ser duplicado.
4. Quando houver posts em inglês, uma pasta como `src/content/blog/en/` pode alimentar essa rota.

## Desenvolvimento local

Requisito: Node.js `>= 22.23.4`. No GitHub Actions o build usa Node 24, padrão da action oficial do Astro.

```bash
npm install
npm run dev
```

O dev server sobe em `http://localhost:4321`.

```bash
npm run build
npm run preview
npm run check
```

`npm run build` precisa de rede na primeira vez que for buscar Marketplace e GitHub. Para testar o fallback sem rede:

```bash
PORTFOLIO_SKIP_REMOTE=1 npm run build
```

Opcional: copie `.env.example` para `.env` e preencha `GITHUB_TOKEN` se o limite anônimo da API do GitHub atrapalhar o build local. Não commite o `.env`.

O lockfile `package-lock.json` precisa permanecer no repositório. A action do Astro escolhe o npm por causa dele.

## Deploy

O workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) publica com a action oficial [`withastro/action`](https://github.com/withastro/action) e [`actions/deploy-pages`](https://github.com/actions/deploy-pages).

Ele roda quando:

- há push na branch `main`
- alguém dispara **Run workflow** na aba Actions (`workflow_dispatch`)
- todo dia às 11:00 UTC (08:00 em `America/Sao_Paulo`), para atualizar instalações, avaliação e repositórios

O `astro.config.ts` usa `site: 'https://alexandred3v.github.io'` e não define `base`, porque este repositório é o user site e o Pages serve a raiz do domínio.

`actions/configure-pages` roda com `enablement` ligado só se o secret **`PAGES_TOKEN`** existir. Esse token não pode ser o `GITHUB_TOKEN`. Use um PAT com escopo `repo` (ou permissão Pages write), ou um GitHub App com `administration:write` e `pages:write`. Sem o secret, habilite o Pages manualmente em **Settings > Pages > Source = GitHub Actions** antes do primeiro workflow verde.

No Actions, o `GITHUB_TOKEN` já entra no build para a API do GitHub não cair no limite anônimo. Não é preciso criar esse secret.

## O que fazer na mão

1. **Settings > Pages > Source → GitHub Actions.** Obrigatório para o deploy padrão.
2. Trocar `profile.email` em `src/data/site.ts`.
3. Reescrever a bio e os itens de formação/experiência. O TADS no IFSP está citado; período e campus ainda são placeholders.
4. Opcional: colocar `public/cv.pdf` e apontar `profile.cvUrl` para `'/cv.pdf'`.
5. Opcional: secret `PAGES_TOKEN` se quiser que o workflow crie o site Pages sozinho.
6. Fazer merge deste PR em `main` (ou disparar o workflow depois). O deploy não roda na branch do PR.
