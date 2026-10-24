/**
 * Conteúdo editável do portfólio.
 *
 * Este é o arquivo para mudar nome, bio, e-mail, currículo, skills,
 * trajetória, links e textos da interface. Números ao vivo (instalações,
 * avaliação e repositórios públicos) são buscados no build em `src/lib/`.
 *
 * Para uma versão em inglês depois: adicione a chave `en` neste objeto
 * `content` (o helper `defineContent` confere o formato) e crie
 * `src/pages/en/index.astro` reutilizando os mesmos componentes.
 */

export const profile = {
  name: 'Alexandre Jackson Corrêa',
  role: 'Desenvolvedor NetSuite / SuiteScript',
  location: 'Brasil',
  countryCode: 'BR',
  avatarUrl: 'https://avatars.githubusercontent.com/u/66167971?v=4',
  /**
   * PLACEHOLDER DE E-MAIL — substitua pelo endereço público de contato.
   * Enquanto o valor contiver COLOQUE_SEU_EMAIL_AQUI, o site avisa no
   * contato e o JSON-LD não publica o endereço.
   */
  email: 'COLOQUE_SEU_EMAIL_AQUI@exemplo.com',
  /**
   * Currículo. Coloque o PDF em `public/cv.pdf` e troque para `'/cv.pdf'`.
   * `null` mantém o botão visível e desabilitado, com o texto "em breve".
   */
  cvUrl: null as string | null,
  /** GitHub marca o perfil como hireable. `false` esconde o selo. */
  availableForProjects: true,
  github: {
    login: 'AlexandreD3v',
    url: 'https://github.com/AlexandreD3v',
  },
  linkedin: {
    url: 'https://br.linkedin.com/in/alexandrejacksoncorrea',
  },
  featuredExtension: {
    name: 'Netsuite - JS Snippets Reload',
    marketplaceId: 'alexandrejcorrea.ns-js-snippets-reload',
    repo: 'AlexandreD3v/ns-js-snippets_reload',
  },
  /**
   * Estes repositórios aparecem primeiro. O restante dos públicos
   * (sem forks e sem arquivados) segue por data de push.
   */
  priorityRepos: [
    'ns-ts-snippets_reload',
    'nsTsDev',
    'base_ns_ts',
    'NetsuiteSuiteScriptsJS',
    'snippetGenerator',
    'user-api',
    'praticasNestJs',
  ],
  /**
   * Usado só se a API do GitHub falhar. Descrições copiadas do GitHub.
   */
  fallbackRepos: [
    {
      name: 'ns-ts-snippets_reload',
      description: 'Typescript snippets to work with Suitescript for Netsuite',
      url: 'https://github.com/AlexandreD3v/ns-ts-snippets_reload',
      language: 'TypeScript',
    },
    {
      name: 'nsTsDev',
      description: 'Typescritp development structure to develop netsuite suitescripts.',
      url: 'https://github.com/AlexandreD3v/nsTsDev',
      language: null,
    },
    {
      name: 'base_ns_ts',
      description: 'Projeto base para desenvolvimento TS para netsuite',
      url: 'https://github.com/AlexandreD3v/base_ns_ts',
      language: null,
    },
    {
      name: 'NetsuiteSuiteScriptsJS',
      description:
        'Script files in javascript for usage or upload on Netsuite Suitescript file cabinet folder',
      url: 'https://github.com/AlexandreD3v/NetsuiteSuiteScriptsJS',
      language: 'JavaScript',
    },
    {
      name: 'snippetGenerator',
      description: null,
      url: 'https://github.com/AlexandreD3v/snippetGenerator',
      language: 'JavaScript',
    },
    {
      name: 'user-api',
      description: 'User-api - prática de desenvolvimento nest.js',
      url: 'https://github.com/AlexandreD3v/user-api',
      language: 'TypeScript',
    },
    {
      name: 'praticasNestJs',
      description: null,
      url: 'https://github.com/AlexandreD3v/praticasNestJs',
      language: 'TypeScript',
    },
    {
      name: 'ns-js-snippets_reload',
      description: 'Javascript snippets for Netsuite Suitescript devepeloment',
      url: 'https://github.com/AlexandreD3v/ns-js-snippets_reload',
      language: 'JavaScript',
    },
    {
      name: 'TADS_IFSP_CPS',
      description: 'Conteúdo das atividades do curso de TADS do IFSP',
      url: 'https://github.com/AlexandreD3v/TADS_IFSP_CPS',
      language: 'C',
    },
  ],
};

const EMAIL_PLACEHOLDER_MARKER = 'COLOQUE_SEU_EMAIL_AQUI';

export function isPlaceholderEmail(email: string): boolean {
  return email.includes(EMAIL_PLACEHOLDER_MARKER);
}

export interface TimelineItem {
  type: 'experience' | 'education';
  title: string;
  org: string;
  period: string;
  summary: string;
  placeholder?: boolean;
  href?: string;
  linkLabel?: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface NavItem {
  href: string;
  label: string;
}

export interface LocaleContent {
  htmlLang: string;
  ogLocale: string;
  localeLabel: string;
  nav: NavItem[];
  skip: string;
  navLabel: string;
  themeToggle: string;
  themeToDark: string;
  themeToLight: string;
  availability: string;
  github: string;
  linkedin: string;
  cv: string;
  cvSoon: string;
  openNewTab: string;
  seo: {
    title: string;
    description: string;
    ogImageAlt: string;
  };
  hero: {
    kicker: string;
    bio: string;
    bioNote: string;
  };
  projects: {
    index: string;
    title: string;
    lead: string;
featuredKicker: string;
      featuredSummary: string;
      installs: string;
    ratingLabel: string;
    ratingSingular: string;
    ratingPlural: string;
    noRatings: string;
    version: string;
    marketplace: string;
    repository: string;
    statsUnavailable: string;
    repoCount: string;
    reposUnavailable: string;
    noDescription: string;
    updated: string;
    stars: string;
    language: string;
  };
  skills: {
    index: string;
    title: string;
    lead: string;
    groups: SkillGroup[];
  };
  timeline: {
    index: string;
    title: string;
    lead: string;
    experience: string;
    education: string;
    placeholder: string;
    items: TimelineItem[];
  };
  contact: {
    index: string;
    title: string;
    lead: string;
    email: string;
    emailNote: string;
    location: string;
  };
  footer: {
    rights: string;
  };
  blog: {
    title: string;
    description: string;
    lead: string;
    empty: string;
    emptyHint: string;
    back: string;
    published: string;
  };
  notFound: {
    title: string;
    description: string;
    body: string;
    back: string;
  };
}

function defineContent<const T extends Record<string, LocaleContent>>(value: T): T {
  return value;
}

export const content = defineContent({
  'pt-BR': {
    htmlLang: 'pt-BR',
    ogLocale: 'pt_BR',
    localeLabel: 'Português',
    nav: [
      { href: '/#inicio', label: 'Início' },
      { href: '/#projetos', label: 'Projetos' },
      { href: '/#skills', label: 'Skills' },
      { href: '/#trajetoria', label: 'Trajetória' },
      { href: '/#contato', label: 'Contato' },
      { href: '/blog', label: 'Blog' },
    ],
    skip: 'Ir para o conteúdo',
    navLabel: 'Seções',
    themeToggle: 'Alternar tema claro e escuro',
    themeToDark: 'Ativar tema escuro',
    themeToLight: 'Ativar tema claro',
    availability: 'disponível para projetos',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    cv: 'Currículo',
    cvSoon: 'em breve',
    openNewTab: 'abre em uma nova aba',
    seo: {
      title: 'Alexandre Jackson Corrêa · Desenvolvedor NetSuite / SuiteScript',
      description:
        'Portfólio de Alexandre Jackson Corrêa, desenvolvedor NetSuite / SuiteScript no Brasil. Projetos, skills, formação e contato.',
      ogImageAlt: 'Alexandre Jackson Corrêa, desenvolvedor NetSuite / SuiteScript',
    },
    hero: {
      kicker: 'Sobre',
      bio: 'Desenvolvedor focado em NetSuite e SuiteScript, no Brasil. Trabalho com customização de contas, scripts e integrações do ERP.',
      bioNote: 'Placeholder — reescreva a bio e apague bioNote em src/data/site.ts.',
    },
    projects: {
      index: '02',
      title: 'Projetos',
      lead: 'Extensão publicada no VS Code Marketplace e repositórios públicos do GitHub. Forks e arquivados ficam de fora.',
      featuredKicker: 'Extensão em destaque',
      featuredSummary:
        'Snippets de SuiteScript para o VS Code, com apoio a módulos N/*, SuiteQL, migração para 2.1, SDF/SuiteCloud CLI e diagnósticos de governança.',
      installs: 'instalações',
      ratingLabel: 'Avaliação',
      ratingSingular: 'avaliação',
      ratingPlural: 'avaliações',
      noRatings: 'Sem avaliações ainda',
      version: 'Versão',
      marketplace: 'Marketplace',
      repository: 'Repositório',
      statsUnavailable: 'Estatísticas do Marketplace indisponíveis neste build.',
      repoCount: 'repositórios públicos, sem forks nem arquivados',
      reposUnavailable:
        'A API do GitHub não respondeu neste build. A grade abaixo é a lista estática de src/data/site.ts.',
      noDescription: 'Sem descrição publicada.',
      updated: 'Atualizado em',
      stars: 'estrelas',
      language: 'Linguagem',
    },
    skills: {
      index: '03',
      title: 'Skills',
      lead: 'O que entra no trabalho de NetSuite e o que uso em volta dele.',
      groups: [
        {
          title: 'NetSuite',
          items: [
            'SuiteScript 1.0, 2.x e 2.1',
            'SuiteQL',
            'SDF / SuiteCloud CLI',
            'Map/Reduce e governança',
            'Integrações',
          ],
        },
        {
          title: 'Stack',
          items: ['JavaScript / TypeScript', 'Node.js', 'NestJS', 'Extensões VS Code'],
        },
      ],
    },
    timeline: {
      index: '04',
      title: 'Formação e experiência',
      lead: 'Itens marcados como “a preencher” são placeholders. Ajuste período, organização e texto em src/data/site.ts.',
      experience: 'Experiência',
      education: 'Formação',
      placeholder: 'A preencher',
      items: [
        {
          type: 'experience',
          title: 'Desenvolvedor NetSuite / SuiteScript',
          org: 'Organização a confirmar',
          period: 'Período a confirmar',
          summary:
            'Placeholder. Descreva módulos, scripts, integrações e o tipo de conta em que você atuou.',
          placeholder: true,
        },
        {
          type: 'education',
          title: 'Tecnologia em Análise e Desenvolvimento de Sistemas (TADS)',
          org: 'Instituto Federal de São Paulo (IFSP)',
          period: 'Período a confirmar',
          summary:
            'Placeholder de campus e período. As atividades do curso estão no repositório TADS_IFSP_CPS.',
          placeholder: true,
          href: 'https://github.com/AlexandreD3v/TADS_IFSP_CPS',
          linkLabel: 'Repositório do curso',
        },
      ],
    },
    contact: {
      index: '05',
      title: 'Contato',
      lead: 'Para um projeto de NetSuite, SuiteScript ou uma conversa sobre o trabalho.',
      email: 'E-mail',
      emailNote:
        'Este endereço é um placeholder. Substitua profile.email em src/data/site.ts.',
      location: 'Local',
    },
    footer: {
      rights: 'Todos os direitos reservados.',
    },
    blog: {
      title: 'Blog',
      description: 'Notas de Alexandre Jackson Corrêa sobre NetSuite, SuiteScript e a stack ao redor.',
      lead: 'Textos em Markdown. Rascunhos com draft: true não são publicados.',
      empty: 'Nenhum texto publicado ainda.',
      emptyHint: 'O exemplo em src/content/blog está como rascunho. Remova draft: true para publicá-lo.',
      back: 'Voltar ao blog',
      published: 'Publicado em',
    },
    notFound: {
      title: 'Página não encontrada',
      description: 'Este endereço não existe no portfólio de Alexandre Jackson Corrêa.',
      body: 'O link pode ter mudado. Volte ao início para ver projetos, skills e contato.',
      back: 'Voltar ao início',
    },
  },
});

export const defaultLocale = 'pt-BR' satisfies keyof typeof content;
export type LocaleCode = keyof typeof content;

export function marketplaceUrl(itemName: string): string {
  return `https://marketplace.visualstudio.com/items?itemName=${itemName}`;
}

export function repoUrl(fullName: string): string {
  return `https://github.com/${fullName}`;
}
