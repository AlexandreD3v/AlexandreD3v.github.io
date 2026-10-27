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
  role: 'Netsuite Developer @ Qlik',
  location: 'Campinas, SP',
  city: 'Campinas',
  region: 'SP',
  countryCode: 'BR',
  avatarUrl: 'https://avatars.githubusercontent.com/u/66167971?v=4',
  email: 'alexandre.j.correa@hotmail.com',
  /**
   * Sem PDF público no perfil. `null` esconde o botão de currículo.
   * Para publicar um arquivo, coloque-o em `public/cv.pdf` e use `'/cv.pdf'`.
   */
  cvUrl: null as string | null,
  /** Empregado na Qlik. O selo de disponibilidade fica oculto. */
  availableForProjects: false,
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
   * Recorte da grade. Forks e arquivados saem antes.
   * Ordem: denylist, depois allowlist, depois palavras de exclusão,
   * depois palavras de inclusão no nome, na descrição, nos tópicos ou na linguagem.
   */
  repoFilter: {
    allow: ['snippetGenerator'],
    deny: [
      'user-api',
      'praticasNestJs',
      'nest_startover',
      'tuto_nestJS',
      'TADS_IFSP_CPS',
      'paginapessoal',
      'gitSite',
      'DWE',
      'casamento',
      'meetrect',
      'node',
      'tests',
      'nsChallenges',
      'AlexandreD3v.github.io',
    ],
    includeKeywords: ['netsuite', 'suitescript', 'suiteql', 'typescript', 'vscode', 'vs code', 'visual studio code'],
    excludeKeywords: ['nestjs', 'nest.js'],
  },
  /**
   * Ordem na grade. O que não estiver aqui segue por data de push.
   */
  priorityRepos: [
    'ns-ts-snippets_reload',
    'ns-js-snippets_reload',
    'snippetGenerator',
    'nsTsDev',
    'base_ns_ts',
    'NetsuiteSuiteScriptsJS',
    'netsuite_dev',
    'firstVsCodeExtension',
  ],
  /**
   * Descrição quando o GitHub não publica uma. Só o que está no README do repositório.
   */
  descriptionOverrides: {
    snippetGenerator: 'Gerador de snippets do VS Code para SuiteScript (Client Script, User Event e Suitelet).',
  } as Record<string, string>,
  /**
   * Usado só se a API do GitHub falhar. Já está no recorte NetSuite / TypeScript / VS Code.
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
      description: 'Gerador de snippets do VS Code para SuiteScript (Client Script, User Event e Suitelet).',
      url: 'https://github.com/AlexandreD3v/snippetGenerator',
      language: 'JavaScript',
    },
    {
      name: 'ns-js-snippets_reload',
      description: 'Javascript snippets for Netsuite Suitescript devepeloment',
      url: 'https://github.com/AlexandreD3v/ns-js-snippets_reload',
      language: 'JavaScript',
    },
    {
      name: 'netsuite_dev',
      description: null,
      url: 'https://github.com/AlexandreD3v/netsuite_dev',
      language: null,
    },
    {
      name: 'firstVsCodeExtension',
      description: 'Building my first vsCode extension',
      url: 'https://github.com/AlexandreD3v/firstVsCodeExtension',
      language: null,
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
  emphasis?: boolean;
  schema?: boolean;
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
      title: 'Alexandre Jackson Corrêa · Netsuite Developer @ Qlik',
      description:
        'Alexandre Jackson Corrêa, Netsuite Developer na Qlik, em Campinas. Customizações de NetSuite com TypeScript, SuiteScript, SuiteQL e integrações.',
      ogImageAlt: 'Alexandre Jackson Corrêa, Netsuite Developer @ Qlik, Campinas, SP',
    },
    hero: {
      kicker: 'Sobre',
      bio: 'Sou desenvolvedor com mais de 10 anos em tecnologia da informação, hoje com foco em JavaScript e TypeScript para customizações de NetSuite. Comecei em 2012 no suporte e no helpdesk, passei por Java web para gestão de projetos e por aplicativos híbridos com Ionic, e entrei no ERP como estagiário na FUNCAMP/Unicamp, em NetSuite e no Dolibarr. Depois atuei como desenvolvedor NetSuite júnior na Quod. Tenho base em PHP, C# e MySQL, certificação Microsoft em Windows Operating System Fundamentals, e sigo entusiasta: todo desafio é possível e conhecimento nunca é demais.',
      bioNote: '',
    },
    projects: {
      index: '02',
      title: 'Projetos',
      lead: 'Extensão publicada no VS Code Marketplace e repositórios de NetSuite, SuiteScript, TypeScript ou extensões do VS Code. Forks, arquivados e o que fica fora desse recorte não entram.',
      featuredKicker: 'Extensão em destaque',
      featuredSummary:
        'Extensão de VS Code com snippets de SuiteScript 2.x, autocomplete de módulos N/*, SuiteQL, migração para 2.1, SDF/SuiteCloud CLI, diagnósticos de governança e ferramentas opcionais de contexto com IA.',
      installs: 'instalações',
      ratingLabel: 'Avaliação',
      ratingSingular: 'avaliação',
      ratingPlural: 'avaliações',
      noRatings: 'Sem avaliações ainda',
      version: 'Versão',
      marketplace: 'Marketplace',
      repository: 'Repositório',
      statsUnavailable: 'Estatísticas do Marketplace indisponíveis neste build.',
      repoCount: 'repositórios de NetSuite, TypeScript ou extensões do VS Code',
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
      lead: 'O centro do trabalho é TypeScript, SuiteScript, SuiteQL e integrações. O resto está no currículo e nos repositórios.',
      groups: [
        {
          title: 'Em foco',
          emphasis: true,
          items: ['TypeScript', 'SuiteScript', 'SuiteQL', 'Integrações (SFTP, REST, ODBC/JDBC)'],
        },
        {
          title: 'Também no currículo',
          items: [
            'JavaScript',
            'Java',
            'PHP',
            'C#',
            'MySQL',
            'Ionic',
            'Dolibarr',
            'Extensões VS Code',
            'Ferramentas de IA (Codex, ChatGPT Enterprise)',
          ],
        },
        {
          title: 'Idiomas',
          schema: false,
          items: ['Português (nativo)', 'Inglês (profissional completo)', 'Espanhol (limitado)'],
        },
        {
          title: 'Certificações',
          schema: false,
          items: [
            'EF SET 51 (CEFR B2)',
            'Microsoft Exam 349 — Windows Operating System Fundamentals (2012)',
          ],
        },
      ],
    },
    timeline: {
      index: '04',
      title: 'Formação e experiência',
      lead: 'Cargos, formações e o começo em suporte, como no perfil público.',
      experience: 'Experiência',
      education: 'Formação',
      placeholder: 'A preencher',
      items: [
        {
          type: 'experience',
          title: 'NetSuite Developer',
          org: 'Qlik',
          period: 'mai/2026–atual',
          summary: 'São Paulo, Brasil.',
        },
        {
          type: 'experience',
          title: 'Senior NetSuite Consultant',
          org: 'Oracle',
          period: 'mar/2024–mar/2026',
          summary:
            'Time ACS Architect, em São Paulo: design e troubleshooting de customizações NetSuite, integrações SFTP, REST, ODBC e JDBC, SuiteQL, refatoração de scripts e uso de ferramentas de IA (Codex e ChatGPT Enterprise).',
        },
        {
          type: 'experience',
          title: 'Desenvolvedor NetSuite Jr.',
          org: 'Quod',
          period: 'fev/2022–mar/2024',
          summary: 'Soluções financeiras e de crédito, em Barueri. Início da atuação como profissional NetSuite.',
        },
        {
          type: 'experience',
          title: 'Desenvolvedor web/NetSuite e estagiário',
          org: 'FUNCAMP — Fundação de Desenvolvimento da Unicamp',
          period: 'abr/2021–abr/2022',
          summary:
            'Campinas. Scripts para o ERP/CRM Oracle NetSuite e para o Dolibarr, gerenciamento de projetos e trilhas de treinamento.',
        },
        {
          type: 'experience',
          title: 'Web Developer',
          org: 'PopApps',
          period: 'abr/2016–nov/2016',
          summary: 'Desenvolvimento mobile com o framework Ionic, em Florianópolis.',
        },
        {
          type: 'experience',
          title: 'Programador Java',
          org: 'Cisterlabs',
          period: 'jun/2014–fev/2016',
          summary: 'Manutenção de projetos e correção de bugs em sistemas Java web, em Francisco Beltrão.',
        },
        {
          type: 'experience',
          title: 'Helpdesk e suporte de TI',
          org: 'BRLOGIC e Anage Imóveis',
          period: '2012–2013',
          summary:
            'Estágio de suporte na Anage Imóveis (abr/2012–jul/2012) e helpdesk na BRLOGIC (abr/2013–set/2013), em Joinville, no começo da carreira em suporte e helpdesk.',
        },
        {
          type: 'education',
          title: 'CST em Análise e Desenvolvimento de Sistemas',
          org: 'Instituto Federal de São Paulo (IFSP)',
          period: '2020',
          summary: 'Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas.',
        },
        {
          type: 'education',
          title: 'Sistemas de Informação',
          org: 'Universidade Paranaense',
          period: '2014–2015',
          summary: 'Formação incompleta.',
        },
        {
          type: 'education',
          title: 'Engenharia de Computação',
          org: 'UniSociesc',
          period: '2012–2013',
          summary: 'Bacharelado. Formação incompleta.',
        },
      ],
    },
    contact: {
      index: '05',
      title: 'Contato',
      lead: 'E-mail e perfis profissionais. Campinas, SP.',
      email: 'E-mail',
      emailNote: '',
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
