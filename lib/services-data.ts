export interface ServiceDetail {
  slug: string
  title: string
  tagline: string
  category: 'residential' | 'commercial' | 'specialized'
  description: string
  benefits: string[]
  methods: string[]
  heightCapability?: string
  detailedServices: string[]
  whyChooseUs: {
    title: string
    description: string
  }[]
  gradient: string
  borderColor: string
  bgColor: string
}

export const servicesData: Record<string, ServiceDetail> = {
  'canapes-et-matelas': {
    slug: 'canapes-et-matelas',
    title: 'Canapés et Matelas',
    tagline: 'Confort et Hygiène Réunis',
    category: 'residential',
    description: 'Les canapés, matelas et fauteuils sont parmi les meubles les plus utilisés au quotidien. Cependant, avec le temps, la poussière, les taches et les micro-organismes peuvent s\'accumuler, altérant leur apparence et créant un environnement peu hygiénique.',
    benefits: [
      'Prolongation de la durée de vie de vos meubles',
      'Élimination des bactéries et allergènes',
      'Restitution de la fraîcheur d\'origine',
      'Produits respectueux de l\'environnement',
    ],
    methods: [
      'Nettoyage à la vapeur haute température (option)',
      'Techniques adaptées aux types de tissus',
      'Traitement des différents types de taches',
      'Produits originaux et adaptés',
    ],
    detailedServices: [
      'Nettoyage en profondeur des canapés',
      'Nettoyage des matelas',
      'Nettoyage des fauteuils',
      'Élimination des bactéries par vapeur (option)',
      'Traitement des taches spécifiques',
    ],
    whyChooseUs: [
      {
        title: 'Employés Experts',
        description: 'Notre équipe est composée de professionnels, formés pour répondre à vos besoins spécifiques avec expertise et rigueur.',
      },
      {
        title: 'Technologie Moderne',
        description: 'Nous utilisons des équipements à la pointe de la technologie pour garantir un nettoyage efficace, rapide et respectueux de votre environnement.',
      },
      {
        title: 'Qualité de Service',
        description: 'Votre satisfaction est notre priorité. Nous nous engageons à fournir des services de qualité supérieure à chaque intervention.',
      },
    ],
    gradient: 'from-primary-500 to-primary-600',
    borderColor: 'border-primary-400',
    bgColor: 'from-primary-50 to-primary-100',
  },
  'fin-de-bail': {
    slug: 'fin-de-bail',
    title: 'Fin de Bail',
    tagline: 'Pour un Déménagement Sans Soucis !',
    category: 'residential',
    description: 'Nous prenons en charge le stress du nettoyage avant et après votre déménagement ! Genève Nettoyage est là pour répondre à tous vos besoins de nettoyage avec une attention méticuleuse aux détails.',
    benefits: [
      'Conformité garantie pour votre départ',
      'Hygiène et santé prioritaires',
      'Produits certifiés et techniques avancées',
      'Environnement sain et sûr',
    ],
    methods: [
      'Nettoyage de la cuisine (placards, électroménagers)',
      'Assainissement des salles de bain et toilettes',
      'Nettoyage des murs',
      'Nettoyage des balcons et terrasses',
      'Nettoyage des moquettes et parquets',
      'Nettoyage des vitres et cadres',
      'Application de cire',
    ],
    detailedServices: [
      'Nettoyage intérieur et extérieur des placards',
      'Nettoyage du four, cuisinière et réfrigérateur',
      'Assainissement en profondeur des sanitaires',
      'Élimination des taches sur les murs',
      'Nettoyage des espaces extérieurs',
      'Nettoyage en profondeur des sols',
      'Cirage des parquets',
    ],
    whyChooseUs: [
      {
        title: 'Hygiène et Santé',
        description: 'Nous accordons une importance particulière à l\'hygiène et à l\'élimination des bactéries dans nos prestations.',
      },
      {
        title: 'Conformité Garantie',
        description: 'Notre service garantit propreté et conformité pour un départ en toute sérénité.',
      },
    ],
    gradient: 'from-secondary-500 to-secondary-600',
    borderColor: 'border-secondary-400',
    bgColor: 'from-secondary-50 to-secondary-100',
  },
  'fin-de-chantier': {
    slug: 'fin-de-chantier',
    title: 'Fin de Chantier',
    tagline: 'Nettoyage Soigné pour la Fin de Chantier!',
    category: 'residential',
    description: 'Une fois les chantiers terminés, le nettoyage des zones de construction est essentiel, tant pour des raisons esthétiques que de sécurité. La poussière, les gravats et autres résidus accumulés durant les travaux peuvent empêcher l\'espace d\'être pleinement opérationnel.',
    benefits: [
      'Espace propre et prêt à être utilisé',
      'Élimination complète des débris',
      'Propreté et qualité garanties',
      'Produits respectueux de l\'environnement',
    ],
    methods: [
      'Nettoyage minutieux des surfaces',
      'Nettoyage des vitres et encadrements',
      'Enlèvement des gravats',
      'Polissage des sols',
    ],
    detailedServices: [
      'Nettoyage en profondeur de la cuisine',
      'Assainissement complet des sanitaires',
      'Élimination des traces sur les murs',
      'Dégagement des débris des balcons et terrasses',
      'Aspiration, lavage et traitement des sols',
      'Lavage et lustrage des vitres',
      'Finitions et cirage',
    ],
    whyChooseUs: [
      {
        title: 'Service sur Mesure',
        description: 'Nous adaptons notre nettoyage après chantier à chaque projet, garantissant que chaque espace est traité avec l\'attention et les techniques spécifiques qu\'il nécessite.',
      },
      {
        title: 'Expertise et Équipements',
        description: 'Grâce à une équipe expérimentée et à des outils modernes, nous assurons un nettoyage rapide, efficace et respectueux des matériaux.',
      },
      {
        title: 'Engagement envers la Durabilité',
        description: 'Nous utilisons des produits respectueux de l\'environnement et des méthodes durables.',
      },
    ],
    gradient: 'from-accent-500 to-accent-600',
    borderColor: 'border-accent-400',
    bgColor: 'from-accent-50 to-accent-100',
  },
  'immeubles': {
    slug: 'immeubles',
    title: 'Immeubles',
    tagline: 'Nettoyage d\'Appartements et Résidences',
    category: 'residential',
    description: 'Les appartements et résidences sont des espaces de vie où propreté et confort doivent aller de pair. Cependant, avec une utilisation quotidienne et un rythme de vie intense, ils peuvent rapidement perdre leur éclat.',
    benefits: [
      'Espaces propres, organisés et agréables',
      'Nettoyage de chaque recoin',
      'Techniques efficaces préservant vos surfaces',
      'Approche écoresponsable',
    ],
    methods: [
      'Nettoyage des halls d\'entrée',
      'Nettoyage des cuisines',
      'Nettoyage des salles de bain',
      'Nettoyage des salons',
      'Nettoyage des vitres',
      'Entretien des sols',
      'Gestion des déchets',
    ],
    detailedServices: [
      'Nettoyage hebdomadaire, mensuel ou ponctuel',
      'Nettoyage des espaces communs',
      'Nettoyage complet des appartements',
      'Entretien des sols',
      'Nettoyage des vitres',
    ],
    whyChooseUs: [
      {
        title: 'Services Adaptés',
        description: 'Chaque appartement et résidence ayant des besoins spécifiques, nous adaptons nos prestations selon vos attentes.',
      },
      {
        title: 'Approche Écoresponsable',
        description: 'Nous privilégions des produits écologiques et des équipements modernes pour un nettoyage durable.',
      },
    ],
    gradient: 'from-primary-500 to-secondary-500',
    borderColor: 'border-primary-400',
    bgColor: 'from-primary-50 to-secondary-50',
  },
  'bureaux': {
    slug: 'bureaux',
    title: 'Bureaux',
    tagline: 'Offrez un Nouvel Éclat à Votre Espace de Travail',
    category: 'commercial',
    description: 'Les bureaux, après une utilisation intensive, nécessitent un nettoyage et une réorganisation approfondis. Un espace de travail propre et bien organisé favorise la productivité des employés et laisse une impression positive sur vos clients.',
    benefits: [
      'Environnement de travail sain et agréable',
      'Image professionnelle renforcée',
      'Productivité améliorée',
      'Motivation de l\'équipe',
    ],
    methods: [
      'Nettoyage en profondeur des meubles',
      'Élimination des saletés accumulées',
      'Entretien des vitres',
      'Nettoyage des salles de réunion',
      'Nettoyage des cuisines et sanitaires',
    ],
    detailedServices: [
      'Nettoyage des espaces communs',
      'Désinfection et nettoyage des postes de travail',
      'Assainissement complet des sanitaires',
      'Élimination des traces sur les murs',
      'Aspiration, lavage et traitement des sols',
      'Cire et finition des sols',
      'Lavage minutieux des vitres',
      'Nettoyage des zones de pause et cuisines',
      'Gestion des déchets',
    ],
    whyChooseUs: [
      {
        title: 'Plans Personnalisés',
        description: 'Nous proposons des plans de nettoyage quotidiens, hebdomadaires ou personnalisés en fonction de vos besoins.',
      },
      {
        title: 'Approche Écoresponsable',
        description: 'Nous utilisons des produits écologiques et des technologies modernes pour minimiser notre impact environnemental.',
      },
    ],
    gradient: 'from-secondary-500 to-accent-500',
    borderColor: 'border-secondary-400',
    bgColor: 'from-secondary-50 to-accent-50',
  },
  'conciergerie': {
    slug: 'conciergerie',
    title: 'Conciergerie',
    tagline: 'Des Solutions sur Mesure pour Entreprises et Résidences',
    category: 'commercial',
    description: 'Dans un monde où le rythme est de plus en plus rapide, les entreprises et les résidences ont besoin de services professionnels pour simplifier leur quotidien. Nos services de conciergerie sont conçus pour répondre aux besoins quotidiens de votre entreprise ou de votre complexe résidentiel.',
    benefits: [
      'Optimisation de votre temps',
      'Espace de vie ou de travail agréable',
      'Services personnalisés',
      'Approche durable',
    ],
    methods: [
      'Nettoyage régulier',
      'Gestion du courrier',
      'Préparation des salles de réunion',
      'Tâches logistiques',
      'Courses et pressing',
    ],
    detailedServices: [
      'Services pour les entreprises',
      'Services pour les résidences',
      'Nettoyage des espaces communs',
      'Entretien technique',
      'Soutien lors de déménagements',
      'Services personnalisés',
    ],
    whyChooseUs: [
      {
        title: 'Solutions Personnalisées',
        description: 'Chaque entreprise et résidence ayant des besoins différents, nous adaptons nos services à vos attentes spécifiques.',
      },
      {
        title: 'Durabilité',
        description: 'Nos services de conciergerie intègrent des produits respectueux de l\'environnement et des pratiques durables.',
      },
    ],
    gradient: 'from-accent-500 to-primary-500',
    borderColor: 'border-accent-400',
    bgColor: 'from-accent-50 to-primary-50',
  },
  'toiture': {
    slug: 'toiture',
    title: 'Toiture',
    tagline: 'Votre Toit, Notre Priorité',
    category: 'specialized',
    description: 'Les toitures jouent un rôle essentiel dans la protection de votre bâtiment contre les intempéries et les agressions extérieures. Cependant, elles sont également les parties les plus exposées à l\'accumulation de saletés, mousses, feuilles et débris divers.',
    heightCapability: '60 mètres',
    benefits: [
      'Sécurité garantie',
      'Prolongation de la durée de vie',
      'Résultat impeccable',
      'Protection contre les dommages',
    ],
    methods: [
      'Nettoyage à haute pression',
      'Produits respectueux de l\'environnement',
      'Techniques adaptées au type de matériau',
      'Équipements modernes et spécialisés',
    ],
    detailedServices: [
      'Élimination des mousses et lichens',
      'Nettoyage des tuiles',
      'Nettoyage des ardoises',
      'Nettoyage des toitures métalliques',
      'Nettoyage jusqu\'à 60 mètres de hauteur',
    ],
    whyChooseUs: [
      {
        title: 'Capacité Unique',
        description: 'Grâce à nos équipements modernes et spécialisés, nous sommes en mesure de nettoyer les toitures jusqu\'à 60 mètres de hauteur.',
      },
      {
        title: 'Sécurité Garantie',
        description: 'Nos équipes sont formées et équipées pour travailler à grande hauteur en respectant toutes les normes de sécurité.',
      },
      {
        title: 'Expertise',
        description: 'Notre expertise nous permet d\'atteindre les zones les plus difficiles d\'accès et de les nettoyer en toute sécurité.',
      },
    ],
    gradient: 'from-primary-600 to-accent-600',
    borderColor: 'border-primary-500',
    bgColor: 'from-primary-50 to-accent-50',
  },
  'vitres': {
    slug: 'vitres',
    title: 'Vitres',
    tagline: 'Une Vue Claire à Toutes les Hauteurs',
    category: 'specialized',
    description: 'Les vitres jouent un rôle essentiel dans l\'esthétique et la luminosité de tout bâtiment. Cependant, elles sont constamment exposées à la poussière, aux intempéries et aux salissures, ce qui peut altérer leur apparence et réduire leur efficacité.',
    heightCapability: '60 mètres',
    benefits: [
      'Accès sécurisé à grande hauteur',
      'Esthétique améliorée',
      'Soin professionnel',
      'Luminosité maximale',
    ],
    methods: [
      'Nettoyage à haute pression',
      'Produits respectueux de l\'environnement',
      'Techniques adaptées au type de vitrage',
      'Équipements spécialisés',
    ],
    detailedServices: [
      'Nettoyage de fenêtres standard',
      'Nettoyage de baies vitrées',
      'Nettoyage de façades en verre',
      'Nettoyage jusqu\'à 60 mètres de hauteur',
    ],
    whyChooseUs: [
      {
        title: 'Expertise pour les Grandes Hauteurs',
        description: 'Grâce à nos équipements spécialisés, nous sommes en mesure de nettoyer des vitres jusqu\'à 60 mètres de hauteur.',
      },
      {
        title: 'Accès Sécurisé',
        description: 'Notre équipe est formée pour travailler en toute sécurité, même dans les conditions les plus exigeantes.',
      },
      {
        title: 'Résultat Impeccable',
        description: 'Chaque détail est pris en compte pour garantir un résultat net et durable.',
      },
    ],
    gradient: 'from-accent-500 to-secondary-600',
    borderColor: 'border-accent-400',
    bgColor: 'from-accent-50 to-secondary-50',
  },
  'facade': {
    slug: 'facade',
    title: 'Façade',
    tagline: 'Sublimez l\'Apparence de Vos Bâtiments',
    category: 'specialized',
    description: 'Les façades des bâtiments reflètent leur esthétique et les protègent contre les agressions extérieures. Avec le temps, la poussière, les traces de pluie et autres résidus peuvent ternir leur apparence et réduire leur durabilité.',
    heightCapability: '60 mètres',
    benefits: [
      'Esthétique renouvelée',
      'Entretien durable',
      'Travail sécurisé',
      'Valorisation du bâtiment',
    ],
    methods: [
      'Produits respectueux de l\'environnement',
      'Techniques adaptées aux matériaux',
      'Équipements modernes',
      'Protocoles stricts de sécurité',
    ],
    detailedServices: [
      'Nettoyage de façades en verre',
      'Nettoyage de façades en métal',
      'Nettoyage de façades en pierre',
      'Nettoyage de façades composites',
      'Nettoyage jusqu\'à 60 mètres de hauteur',
    ],
    whyChooseUs: [
      {
        title: 'Pour les Grandes Hauteurs',
        description: 'Grâce à nos équipements modernes, nous pouvons nettoyer des façades jusqu\'à 60 mètres de hauteur.',
      },
      {
        title: 'Esthétique Renouvelée',
        description: 'Une façade propre et brillante valorise votre bâtiment et renforce son attractivité.',
      },
      {
        title: 'Travail Sécurisé',
        description: 'Nos équipes suivent des protocoles stricts pour travailler en hauteur en toute sécurité.',
      },
    ],
    gradient: 'from-secondary-600 to-primary-600',
    borderColor: 'border-secondary-500',
    bgColor: 'from-secondary-50 to-primary-50',
  },
}

