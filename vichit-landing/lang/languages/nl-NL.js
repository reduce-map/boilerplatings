// https://i18n.nuxtjs.org/lazy-load-translations
export default (context, locale) => {
  // return await Promise.resolve({
  return {
    welcome: 'Welkom',
    pages: 'pages',
    home: 'home',
    'page-not-found': 'Oeps! Sorry, pagina niet gevonden.',

    services: {
      link: 'diensten',
      title: 'diensten',
    },
    expertise: {
      title: 'expertise we deliver',
      link: 'expertise',
      list: {
        solutions: {
          title: 'solutions',
          text: 'Bespoke development of corporate systems, cutting-edge software products, and automation services',
        },
        technologies: {
          title: 'technologies',
          text: 'All major platforms and programming languages as well as cutting-edge including AI, VR, IoT, Big Data, and more',
        },
        industries: {
          title: 'industries',
          text: 'Our engineers have expertise with a wide range of industries including Information Technology, Healthcare, Banking and Financial Services, Manufacturing, Transportation and Logistics, Retail and Professional Services',
        },
      },
    },

    'about-us': {
      link: 'about us',
    },

    'cookie-policy': {
      link: 'cookie policy',
    },

    'privacy-policy': {
      link: 'privacybeleid',
      title: 'privacybeleid',
    },

    'web-development': {
      title: 'web development',
    },

    'mobile-application-development': {
      title: 'mobile application development',
    },

    consulting: {
      title: 'consulting',
    },

    footer: {
      'contact-sales': 'contact sales',
      'email-us': 'email us',
      description: `VICHIT.TECH provides top-quality custom web and mobile development,
      UX design, testing, and support services. Systems we develop deliver
      benefit to customers in automotive, telecommunications, aviation,
      advertising, gaming industry, banking, real estate, and healthcare.
      We have advanced skills and ample resources to create large-scale
      solutions as well as guide startups from idea to profit.`,
    },

    solutions: {
      link: 'oplossingen',
      title: 'oplossingen',
    },

    industries: 'industries',

    technologies: {
      link: 'technologieën',
      title: 'technologieën',
    },

    'show more': 'show more',

    // uppercase ? do we need them ?
    Home: 'Home',
    About: 'Over ons',
    'Contact us': 'Contact us',
    Locales: 'Locales',
    'Contact Us': 'Contact Us',
    'Lets talk': 'let sink',
    'Hire us': 'Hideous',

    'Open navigation': 'Navigatie openen',
    'Learn more': 'Leer meer',

    Loading: 'Bezig met laden',

    firstSlide: {
      landingTyper: {
        prefix: 'Laat ons uw ideeën omzetten in',
        textList: [
          'progressieve merken',
          'ambitieuze beslissingen',
          'innovatieve digitalisering',
          'succesvolle startups',
          `indrukwekkende programma's`,
          'innovatieve diensten',
          'winstgevende ondernemingen',
          'succesvolle projecten',
          'digitaal succes',
          'aanzienlijke resultaten',
          'ongebreidelde mogelijkheden',
          'ingenieuze producten',
          'creatieve diensten',
          'de dingen die ertoe doen',
          'de dingen die stabiel zijn',
        ],
      },
      bannerText: {
        prefix:
          'WIJ ONDERSTEUNEN ONDERNEMINGEN, PRODUCTHUISJES EN STARTUPS MET:',
        textList: [
          'Dedicated software development teams oprichting en operaties',
          'Webontwikkelingsdiensten op maat',
          'IT-consulting en digitaal advies',
        ],
      },
    },

    secondSlide: {
      servicesTitle: 'Services We Deliver',
      servicesDescription: `
        We bieden een volledig spectrum aan webontwikkelingsservices om kleine en middelgrote ondernemingen, producthuizen en startups te helpen hun bedrijf op te schalen.
         Als bedrijf dat technologische oplossingen biedt, bieden we een breed scala aan diensten op het gebied van advies, web- en mobiele ontwikkeling en kwaliteitstests.
         We hebben speciale aanbiedingen voor startups, technische en wetenschappelijke organisaties.
      `,
      servicesList: [
        {
          link: 'services',
          name: 'Web App Development',
          description:
            'Update, redesign or build your website (or even design system) from scratch to a product that your users will love.',
        },
        {
          link: 'services',
          name: 'Mobile App Development',
          description:
            'Full cycle of an application design, integration and management services. We develop applications for iOS, Android and Windows.',
        },
        {
          link: 'services',
          name: 'IT Consulting Digital advisory',
          description:
            'Get your business and IT strategies aligned. We do business, technology and solution consulting.',
        },
      ],
      bottomText: 'Looking for other services?',
    },

    thirdSlide: {
      expertiseTitle: 'Expertise We Deliver',
      expertiseList: {
        solutions: {
          title: 'Solutions',
          description:
            'Cutting-edge development products and automation services. Our experienced engineers, managers and top designers are at your service whenever you might need support with any type of project complexity!',
        },
        technologies: {
          title: 'Technologies',
          description:
            'Our expertise spans all major technologies and platforms, and advances to innovative technology trends.',
        },
        industries: {
          title: 'Industries',
          description:
            'Information Technology, Healthcare, Banking and Financial Services, Transportation and Logistics, Retail, Professional Services, Manufacturing',
        },
      },
    },

    servicesList: [
      {
        title: 'Mobiele ontwikkeling',
        text: 'Ontwikkelingsdiensten voor mobiele apps omvatten de end-to-end ontwikkeling van mobiele apps, van bedrijfsanalyse en UI/UX-ontwerp tot het testen en implementeren van mobiele applicaties of publicatie op de onlinemarkt.',
      },
      {
        title: 'Dedicated Development Teams',
        text: 'Huur ons softwareontwikkelingsteam op afstand om te zien hoe de echte efficiëntie eruit ziet. Vertrouw de implementatie van geavanceerde technologie toe aan VICHIT en concentreer u op waar u het beste in bent: uw klanten zo goed mogelijk bedienen.',
      },
      {
        title: 'Webontwikkeling',
        text: 'Webontwikkelingsdiensten worden gebruikt voor het ontwerpen, bouwen, ondersteunen en ontwikkelen van alle soorten webgebaseerde software. levert intuïtieve en snelle websites, webportalen en andere weboplossingen die zorgen voor digitale transformatie en zakelijke workflows verbeteren.',
      },

      {
        title: 'IT Consulting',
        text: 'Adviesdiensten op het gebied van informatietechnologie (IT) helpen u bij het ontwikkelen en in praktijk brengen van de IT-strategie. We bieden advies op het gebied van digitale transformatie, advies over IT-strategie, advies over IT-oplossingen en technologieadvies',
      },

      {
        title: 'UX/UI-ontwerp',
        text: 'Webontwerpdiensten omvatten de processen van gebruikersinterface (UI) en gebruikerservaring (UX) ontwerp van elke webgebaseerde oplossing.',
      },
      {
        title: 'Testen en QA',
        text: 'Onze QA-services helpen u om concrete controle te krijgen over de levenscyclus van uw product, elke ontwikkelingsfase te bewaken en u nauwkeurige informatie over de productkwaliteit te geven.',
      },
      {
        title: 'Project Management',
        text: 'Make your team work from the onset of project analysis and estimation. We provide Coordination of Team Work, Realistic Schedule Creation, Software Development Lifecycle Planning and Remote Project Management.',
      },
      {
        title: 'MVP ontwikkelingsdiensten',
        text: `MVP-ontwikkeling is de beste manier om je idee te valideren en je doelen te bereiken met minder risico's. Verifieer uw bedrijfsidee met een kwaliteitstestversie van uw digitale product`,
      },
      {
        title: 'Research & Development (R&D)',
        text: 'R&D as a Service (RnDaaS) offers a shorter time-to-market of your innovation thanks to access to an experienced team of developers, QA specialists, and product managers. Implement emerging technologies from industry leaders. R&D professionals can support your business in many ways.',
      },
      {
        title: 'Custom Software Development',
        text: 'You can get professional custom desktop applications of any kind. Our experienced specialists will develop and guide you through the software development lifecycle so you will always in the project loop.',
      },
      {
        title: 'Software product development',
        text: `Businesses in different industries have unique sets of concerns and challenges. Our enterprise software development team works to make organization operations as efficient as possible, so that your company can focus on growth instead of maintenance.`,
      },
      {
        title: 'Custom Application Development Services',
        text: "We'll help you bring your most complex software vision to life with our leading full-cycle custom application development service. So you can focus on delivering an incredible user experience that sets you apart from the competition.",
      },
    ],

    sitemap: {
      link: 'sitemap',
      title: 'sitemap',
    },
    Vichit: 'VICHIT.TECH',
    'VICHIT.TECH': 'VICHIT.TECH',
    VICHIT: 'VICHIT.TECH',
    'All rights reserved': 'Alle rechten voorbehouden',

    // pages meta data
    metaData: {
      services: {
        title: `VICHIT.TECH | IT Services to Help You Reach Your Goals`,
        meta: {
          description:
            'VICHIT.TECH services offer scalable, reliable software solutions – allowing you to grow your business through insight and stay ahead of the curve.',
        },
      },
      consulting: {
        title: `VICHIT.TECH | Consulting`,
        meta: {
          description: 'VICHIT.TECH consulting',
        },
      },
      'mobile-application-development': {
        title: `VICHIT.TECH | Mobile Application Development`,
        meta: {
          description: 'VICHIT.TECH Mobile Application Development',
        },
      },
      'web-development': {
        title: `VICHIT.TECH | Web Development`,
        meta: {
          description: 'VICHIT.TECH Web Development',
        },
      },

      'about-us': {
        title: `VICHIT.TECH | About us`,
        meta: {
          description: 'VICHIT.TECH about us',
        },
      },

      'contact-us': {
        title: `VICHIT.TECH | Contact us`,
        meta: {
          description: 'VICHIT.TECH contact us',
        },
      },
      expertise: {
        title: `VICHIT.TECH | Expertise`,
        meta: {
          description: 'VICHIT.TECH expertise',
        },
      },
      industries: {
        title: `VICHIT.TECH | Industries`,
        meta: {
          description: 'VICHIT.TECH industries',
        },
      },

      'privacy-policy': {
        title: `VICHIT.TECH | Privacy Policy`,
        meta: {
          description: 'VICHIT.TECH privacy policy',
        },
      },
      'cookie-policy': {
        title: 'VICHIT.TECH | Cookie Policy',
        meta: {
          description:
            'VICHIT.TECH - Software engineering, enterprise software development, consulting',
        },
      },

      sitemap: {
        title: `VICHIT.TECH | Sitemap`,
        meta: {
          description: 'VICHIT.TECH sitemap',
        },
      },
      solutions: {
        title: `VICHIT.TECH | Solutions`,
        meta: {
          description: 'VICHIT.TECH solutions',
        },
      },
      technologies: {
        title: `VICHIT.TECH | Technologies`,
        meta: {
          description: 'VICHIT.TECH technologies',
        },
      },
    },

    cookieBanner: {
      title: 'De website maakt gebruik van cookies',
      content: `Deze website gebruikt cookies om uw ervaring te verbeteren. We gaan ervan uit dat je hiermee akkoord gaat.`,
      agreeButton: 'Begrepen',
    },

    // ##########################################
    // Pages contact us START
    // ##########################################
    'contact-us-header': 'Contact us',
    'contact-us-info-header': "LET'S GET IN TOUCH!",
    'contact-us-info-subheader':
      "Want to discuss your product or partnership? We're always ready to help.",
    'contact-us-error-required-message': 'This field is required.',
    'contact-us-error-email-message': 'Email address is invalid.',
    'contact-us-tooltip-first-name':
      'We need your name to know how to address you',
    'contact-us-tooltip-email': 'We need your email to respond to your request',
    'contact-us-tooltip-phone':
      'We need your phone number to reach you with response to your request',
    'contact-us-tooltip-country':
      'We need your country of business to know from what office to contact you',
    'contact-us-tooltip-company':
      'We need your company name to know your background and how we can use our experience to help you',
    'contact-us-personal-data':
      'I give consent to the processing of my personal data given in the above contact form for the purposes of answering my inquiry and any further correspondence.',
    'contact-us-submit': 'Send message',
    'contact-us-dna': 'Send me NDA',
    // ##########################################
    // Pages contact us END
    // ##########################################
  }
}
