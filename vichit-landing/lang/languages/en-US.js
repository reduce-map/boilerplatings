// https://i18n.nuxtjs.org/lazy-load-translations
export default (context, locale) => {
  // return await Promise.resolve({
  return {
    // ##########################################
    // GLOBAL DECLARATIONS START
    // ##########################################

    welcome: 'Welcome',
    pages: 'pages',
    home: 'home',
    'page-not-found': 'Oops! Sorry, page not found.',
    'show more': 'show more',

    Vichit: 'VICHIT.TECH',
    'VICHIT.TECH': 'VICHIT.TECH',
    VICHIT: 'VICHIT.TECH',
    'All rights reserved': 'All rights reserved',

    // TODO uppercase ? do we need them ?
    Home: 'Home',
    About: 'About',
    'Contact us': 'Contact us',
    Locales: 'Locales',
    'Contact Us': 'Contact Us',
    'Lets talk': "Let's talk",
    'Hire us': 'Hire us',
    'Open navigation': 'Open navigation',
    'Learn more': 'Learn more',
    Loading: 'Loading',

    cookieBanner: {
      title: 'The website uses cookies',
      content: `This website uses cookies to improve your experience. We'll assume you're ok with this.`,
      agreeButton: 'Got it',
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

    // ##########################################
    // GLOBAL DECLARATIONS END
    // ##########################################

    // ##########################################
    // Index Page START
    // ##########################################
    firstSlide: {
      landingTyper: {
        prefix: 'Let us turn your ideas into',
        textList: [
          'progressive brands',
          'ambitious decisions',
          'innovative digitalization',
          'successful startups',
          'impressive programs',
          'innovative services',
          'profitable businesses',
          'successful projects',
          'digital success',
          'significant results',
          'rampant possibilities',
          'ingenious products',
          'creative services',
          'the things that matter',
          'the things that stable',
        ],
      },
      bannerText: {
        prefix: 'WE SUPPORT ENTERPRISES, PRODUCT HOUSES AND STARTUPS WITH:',
        textList: [
          'Dedicated development teams establishment and operations',
          'Custom web and mobile development services',
          'IT consulting and digital advisory',
        ],
      },
    },

    secondSlide: {
      title: 'Great software is built by <mark>great teams</mark>',
      description: `
        We provide a <mark> full spectrum of web and mobile development services and custom development solutions </mark> to help <strong>startups</strong>, <strong>SMBs</strong> and <strong>SMEs</strong> to scale and support their business.
        As a technology driven service company we offer a wide range of services like <mark>consulting</mark>, <mark>web and mobile applications development</mark>, <mark>project management</mark> and <mark>quality testing services</mark>.
        Also we have special offers for <mark>startups</mark>, <mark>technical</mark> and <mark>scientific organizations</mark>.
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
      bottomText: 'Looking for full list of our services?',
    },

    thirdSlide: {
      title: 'Expertise We Deliver',
      solutions: {
        title: 'Custom Software Solutions We Offer',
        descriptionList: [
          'We offer our clients only the most ingenious and quality customized software solutions for the web and mobile that achieve the business goals.',
          'Our in-house development teams design, develop, deploy and maintain software at a predefined set of requirements using SDLC model to navigate through the complex and demanding process of software building (requirement analysis and requirements gathering, development scope definition and design architecting the future system, constructing clean and testable code, testing the product, deployment and maintenance).',
          'What differentiates our custom software development services from others is our scalable, robust software products built using quality engineering, approaches used to modernize apps, and adherence to agile and CI/CD principles throughout the product development life cycle.',
        ],
        list: [
          {
            title: 'Enterprise application software',
            descriptionList: [
              'We customize enterprise-grade software to help businesses like you thrive in their business processes. This custom-designed software is targeted to your specific set of users and serves their unique requirements. Our in-house development teams customize, modernize and manage applications that accelerate your workflows.',
              'As a result, our products are easy-to-operate solutions that optimize and automate your business processes and give 100% satisfaction to the users. Our enterprise-based custom software application development services include numerous apps.',
            ],
            services: [
              'Enterprise Process Management (ERPs) tools',
              'Customer Relationship Management Software (CRMs)',
              'Human Resources Management Software(HRMS)',
              'Content Management Systems (CMS)',
              'Asset Management Software',
            ],
          },
          {
            title: 'Specialized services software solutions',
            descriptionList: [
              `We develop this set of software specifically to serve business-specific functions that your business needs. In addition, we strive to offer you exclusive solutions that are difficult to meet by the market's existing software solutions.`,
              "Our customized solutions come with additional features aligned with your business's core services and are built using cost-effective techniques that suit your budget.",
            ],
            services: [
              'Accounting software',
              'Payroll management',
              'Asset management software',
              'Database software',
              'Pharmaceutical inventory and billing systems',
            ],
          },
          {
            title: 'Customer-centric apps',
            descriptionList: [
              `We specialize in creating apps that stand out in providing personalized and interactive user experiences and represent a strong business identity among your target market. Embrace the flexibility of B2B and B2C customer applications that offer a wow-factor to your users with minimalistic design and quick responding features.`,
              `In addition, you will get access to post-sales guidance, customer support, and streamlined services for technical support.`,
            ],
            services: [
              'Social media apps',
              'eCommerce apps',
              'Mobile net banking apps',
              'Patient and healthcare apps',
            ],
          },
          {
            title: 'Industrial software',
            industriesList: [
              'Information Technology',
              'Healthcare',
              'Banking and Financial Services',
              'Manufacturing',
              'Transportation and Logistics',
              'Retail and Professional Services',
            ],
            descriptionList: [
              'We build software products with unique functionalities to serve the commercial market, such as managing inventories, operational management, financial management, etc. These products have advanced functionalities different from existing ready-made solutions.',
              'Discover how our set of software but not limited to can help you lead the competition, automate your business processes and improve productivity.',
              'Our engineers have expertise with a wide range of industries including: Information Technology, Healthcare, Banking and Financial Services, Manufacturing, Transportation and Logistics, Retail and Professional Services',
            ],
            services: [
              'Financial software',
              'Law firm KPI tools',
              'Legal department dashboards',
              'Business intelligence systems',
              'Logistics industry analytics tools',
              'Market research software',
            ],
          },
        ],
      },
      technologies: {
        title: 'Technologies we use',
        description:
          'We use many major technologies and platforms, and advances to innovative technology trends.',
      },
    },
    // ##########################################
    // Index Page END
    // ##########################################

    // ##########################################
    // Services Page START
    // ##########################################
    servicesPage: {
      link: 'services',
      title: 'services we deliver',
      description:
        'We add development capacity to tech teams. Our value isn’t limited to building teams but is equally distributed across the project lifecycle. We are a custom software development company that guarantees the successful delivery of your project.',
      engineering: 'engineering',
      engineeringServices: [
        {
          icon: 'custom-software.png',
          title: 'Custom software development',
          text: 'Businesses in different industries have unique sets of concerns and challenges. Our software development team works to make organization operations as efficient as possible, so that your company can focus on growth instead of maintenance.',
        },
        {
          icon: 'web-development.png',
          title: 'Web Development',
          text: 'Web development services are used to design, build, support, and evolve all types of web-based software. Delivers intuitive and fast websites, web portals, and other web solutions that bring about digital transformation and enhance business workflows.',
        },
        {
          icon: 'mobile-development.png',
          title: 'Mobile Development',
          text: 'Mobile app development services cover end-to-end development of mobile apps, from business analysis and UI/UX design to mobile application testing and deployment or online market.',
        },
        {
          icon: 'app-development.png',
          title: 'Application development',
          text: `You can get professional applications of any kind. Our experienced specialists will develop and guide you through the software development lifecycle so you will always in the project loop.`,
        },
        {
          icon: 're‑engineering.png',
          title: 'Application re‑engineering',
          text: 'Reimagine a legacy application with technological innovation that boosts performance, scalability and UX.',
        },
        {
          icon: 'dedicated-team.png',
          title: 'Dedicated Development Teams',
          text: 'Hire our remote software development team to see the actual efficiency. Entrust the implementation of cutting-edge Technology to VICHIT and focus on what you do best - serving your clients to the best of your abilities.',
        },
      ],

      servicesAdditionalTitle: 'Other engineering services:',

      engineeringServicesSpecial: [
        {
          title: 'POC development',
          text: "Test your hypothesis, iterate rapidly. It's the best possible way safely explore business concepts before taking them to market.",
        },
        {
          title: 'MVP development',
          text: 'MVP development is the best way to validate your idea and reach your goals with fewer risks. Verify your business idea with a quality test version of your digital product',
        },
        {
          title: 'Research & Development (R&D)',
          text: 'R&D as a Service (RnDaaS) offers a shorter time-to-market of your innovation thanks to access to an experienced team of developers, QA specialists, and product managers. Implement emerging technologies from industry leaders. R&D professionals can support your business in many ways.',
        },
        {
          title: 'UX/UI design',
          text: 'Web design services incorporate the processes of user interface (UI) and user experience (UX) design of any web-based solution.',
        },
        {
          title: 'Testing and QA',
          text: "Our QA services will help you establish concrete control over your product's life cycle, monitor every development stage, and give you accurate product quality information.",
        },
        {
          title: 'Project Management',
          text: 'Make your team work from the onset of project analysis and estimation. We provide Coordination of Team Work, Realistic Schedule Creation, Software Development Lifecycle Planning and Remote Project Management.',
        },
      ],

      advisory: 'advisory',

      advisoryServices: [
        {
          icon: 'it-consulting.png',
          title: 'IT Consulting',
          text: "Information technology (IT) consulting services will help you develop and put into practice the IT strategy. We're providing digital transformation consulting, IT strategy consulting, IT solution consulting, Technology consulting.",
        },
        {
          icon: 're‑engineering.png',
          title: 'Product design',
          text: 'Validate your innovative idea, develop great product concept and create the blueprint for your product success',
        },
        {
          icon: 'data-science.png',
          title: 'Data science',
          text: 'Deep-dive into your data and boost business performance by understanding what your users really want.',
        },
      ],

      optimisation: 'optimisation',

      optimisationServices: [
        {
          icon: 'software-audit.png',
          title: 'Software audit',
          text: 'Identify the strengths and weaknesses of your current software products and processes – so you can avoid risk and minimise revenue loss.',
        },
        {
          icon: 'it-technical-support.png',
          title: 'Quality assurance',
          text: 'Custom-built quality assurance and testing services help you deliver a robust and UX-optimised product to market, up to 80% faster and 20% cheaper.',
        },
      ],
    },
    // ##########################################
    // Services Page END
    // ##########################################

    // Pages !!!!!!!!!!
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
      title: 'cookie policy',
    },

    'privacy-policy': {
      link: 'privacy policy',
      title: 'privacy policy',
    },
    sitemap: {
      link: 'sitemap',
      title: 'sitemap',
    },

    solutions: {
      link: 'solutions',
      title: 'solutions',
    },
    industries: 'industries',
    technologies: {
      link: 'technologies',
      title: 'technologies',
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

    // ##########################################
    // Pages Meta Data START
    // ##########################################
    metaData: {
      index: {
        title: `VICHIT.TECH | Enterprise Software Development, Technology Consulting`,
        description:
          'VICHIT.TECH is a software engineering company that provides full-cycle software engineering outsourcing services, from ideation to finished products.',
      },

      services: {
        title: `End-to-End Software Development Outsourcing Services`,
        description:
          'VICHIT.TECH services offer scalable, reliable software solutions – allowing you to grow your business through insight and stay ahead of the curve.',
      },

      consulting: {
        title: `VICHIT.TECH | Consulting`,
        description: 'VICHIT.TECH consulting',
      },

      'mobile-application-development': {
        title: `VICHIT.TECH | Mobile Application Development`,
        description: 'VICHIT.TECH Mobile Application Development',
      },

      'web-development': {
        title: `VICHIT.TECH | Web Development`,
        description: 'VICHIT.TECH Web Development',
      },

      'about-us': {
        title: `VICHIT.TECH | About us`,
        description: 'VICHIT.TECH about us',
      },

      'contact-us': {
        title: `VICHIT.TECH | Contact us`,
        description: 'VICHIT.TECH contact us',
      },

      expertise: {
        title: `VICHIT.TECH | Expertise`,
        description: 'VICHIT.TECH expertise',
      },

      industries: {
        title: `VICHIT.TECH | Industries`,
        description: 'VICHIT.TECH industries',
      },

      'privacy-policy': {
        title: `VICHIT.TECH | Privacy Policy`,
        description: 'VICHIT.TECH privacy policy',
      },

      'cookie-policy': {
        title: 'VICHIT.TECH | Cookie Policy',
        description:
          'VICHIT.TECH - Software engineering, enterprise software development, consulting',
      },

      sitemap: {
        title: `VICHIT.TECH | Sitemap`,
        description: 'VICHIT.TECH sitemap',
      },

      solutions: {
        title: `VICHIT.TECH | Solutions`,
        description: 'VICHIT.TECH solutions',
      },

      technologies: {
        title: `VICHIT.TECH | Technologies`,
        description: 'VICHIT.TECH technologies',
      },
      'custom-software-development': {
        title: `VICHIT.TECH | Custom Software Development`,
        description: 'VICHIT.TECH Custom Software Development',
      },
    },
    // ##########################################
    // Pages Meta Data END
    // ##########################################

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

    // ##########################################
    // Pages generate START
    // ##########################################
    'generic-pages': {
      'custom-software-development': {
        views: [
          {
            type: 'DefaultStartView',
            data: {
              title:
                'Custom software development services trusted by Fortune 1000 companies',
              subtitle:
                'Reimagine your business into a software-first business with our custom software design and development approach',
              imgName: '20.jpeg',
              button: {
                type: 'secondary',
                text: "Let's get started!",
                path: 'contact-us',
              },
            },
          },
          {
            type: 'TextList',
            data: {
              title: 'Why Vichit for Custom Software Development Services?',
              list: [
                {
                  text: 'Complete product ownership',
                },
                {
                  text: 'Software quality guaranteed',
                },
                {
                  text: 'Flexibility to use your custom software',
                },
                {
                  text: 'Advanced tech stacks',
                },
                {
                  text: 'Transparent communication and reporting',
                },
                {
                  text: 'Guaranteed after-sales support',
                },
                {
                  text: 'Consistent delivery with the agile approach',
                },
                {
                  text: 'Proven track record in building successful MVP',
                },
              ],
              paragraphs: [
                {
                  chunks: [
                    {
                      text: 'We are a custom software development company delivering quality customized software solutions for the web and mobile. Our in-house',
                    },
                    {
                      text: "development teams'",
                      highlight: true,
                    },
                    {
                      text: 'design, develop, deploy and maintain software and aim at a predefined set of requirements.',
                    },
                  ],
                },
                {
                  chunks: [
                    {
                      text: 'Our software development cycle passes through several steps, including requirements gathering, ideation, architecting systems that support iterative releases, constructing clean and testable code, as well as quality testing process.',
                    },
                  ],
                },
                {
                  chunks: [
                    {
                      text: 'What differentiates our custom software development services from others is our scalable, robust software products built using quality engineering, approaches used to modernize apps, and adherence to agile and CI/CD principles throughout the product development life cycle.',
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
    },
    // ##########################################
    // Pages generate END
    // ##########################################
  }
}
