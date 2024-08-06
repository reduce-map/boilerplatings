<template>
  <div class="app-page-indent about-us">
    <div class="p-4 app-page-wrapper">
      <div class="mb-12 lg:mb-24">
        <vt-breadcrumbs class="my-4" :items="breadcrumbs" />
        <vt-heading
          level="1"
          class-content="lg:!text-5xl text-center privacy-policy__header mb-16"
        >
          About us
        </vt-heading>
      </div>
      <p>
        IT Services to Help You Reach Your Goals. A Well-Proven Software
        Development Company in Ukraine. Give impetus to your business with
        tailored web solutions Dedicated IT specialist for your product We
        provide outstaffing services.
      </p>
      <vt-heading level="2" class-content="my-16">
        SOFTWARE CONSULTING AND DEVELOPMENT FOR YOUR DIGITAL SUCCESS
      </vt-heading>
      <p>
        For millions of users. We transform businesses with powerful and
        adaptable digital solutions that satisfy the needs of today and unlock
        the opportunities of tomorrow
      </p>
      <vt-heading level="2" class-content="my-16">
        VICHIT is a Custom Software Development Company.
      </vt-heading>

      <p>
        We provide custom software development and IT outsourcing services. Our
        developers build custom software for individuals, startups, and small to
        medium businesses. WE ARE VICHIT Custom Product & Software Development
        Focused On Your Success. Take the software path to your digital future
        Discover VICHIT Difference Have a software development project you need
        to be done right the first time? Count on the talented and skilled
        developers at VICHIT. Based in Ukraine, but with worldwide developers,
        we combine a top-notch custom coding team with PMs that act as your
        strategic partners. Affordably.
      </p>

      <vt-heading level="2" class-content="my-16">
        VICHIT Results-Only
      </vt-heading>
      <p>
        We are an innovation consultancy creating new digital products,
        services, and businesses that deliver sustainable, profitable growth for
        the world's most ambitious companies. We Build to Break Through. We work
        at the intersection of business, technology, and rampant opportunity –
        where aggressive technological innovation meets real business results.
        Custom software and system integration Consider IT done
      </p>
      <vt-heading level="2" class-content="my-16">
        Recipes for your success
      </vt-heading>

      <p>
        Innovate with you Focusing on hearing you and bringing to life new
        concepts helps to grasp market opportunities by building a proof of
        concepts or minimum valuable product. Deliver full scope of work.
        Full-stack, self-managed teams that can build a custom, enterprise-grade
        solution. From high-load systems to proofs-of-concept. Augment your
        team. Helpful hand for your team through skillset augmentation including
        development, QA/testing, UX/UI, and product/project management.
        Modernize legacy technology. Re-architecting legacy technology with a
        data migration plan for better user experience to support digital
        transformation.
      </p>
      <vt-heading level="2" class-content="my-16">
        VICHIT IT Outsourcing & Consulting Company Ukraine
      </vt-heading>
      <p>
        VICHIT IT Outsourcing & Consulting Company Ukraine VICHIT is Ukraine's
        top IT outsourcing & consulting services company for 10+ years offering
        customized software & web development services globally. Connect with us
        on ...@...com to discuss your business needs in detail.
      </p>
      <p>
        Our team specializes in software engineering, product development, cloud
        architecture, and digital transformation. We rapidly and reliably
        deliver software that meets the needs of the world's most demanding
        organizations.
      </p>
      <p>
        We partner with product owners and founders by developing products from
        scratch or growing the existing product Helping clients to bring
        innovations to life As a progressive software development company, we
        use popular technologies and have more than 10 years of experience. We
        want to grow your business using innovative solutions and provide you
        with transparent and high-quality services.
      </p>
      <p>
        VICHIT focuses on new features and tools, product business logic, and
        constant improvement. Our clients call us "a lifetime strategic
        partner", which is our main aim. VICHIT started from a small team and
        developed into a trusted and reliable tech partner for enterprises and
        startups that knows how to scale up your business.
      </p>
      <p>
        Software Partners for the Digital Age Specializing in custom software,
        digital transformations, and complex integrations for Enterprises,
        Financial Institutions, and disruptive Start-ups
      </p>
      <p>
        Discover The VICHIT Difference Have a software development project you
        need to be done right the first time? Count on the talented and skilled
        developers at VICHIT. Based in Ukraine, but with worldwide developers,
        we combine a top-notch custom coding team with PMs that act as your
        strategic partners. Affordably.
      </p>
      <p>
        ...There are Two Ways To Work With VICHIT Software Solutions for
        Business Staff Augmentation, Existing Projects When you have a
        short-term project and need highly-skilled and low-cost developers to
        support your team. When you need specific coding needs such as .net,
        PHP, Ruby, Python, and much more. When you prefer a team supporting you
        100% with great work and quick response as needed. When you need a
        strategic, experienced team by your side to partner with. When you need
        a team that will come through on time, on-budget, and with all bases
        including robust tests ting covered. When you are interested in our
        agile process to software development success. The Practical Agile
        Advantage What is a practical agile approach to software development? At
        VICHIT, it's a combination of: Principles and practices that can easily
        be combined with a variety of approaches High-trust, self-organized
        teams who understand specific business needs. Staying focused on the
        rapid development and deployment of software. At VICHIT, good software
        development starts with a great idea. From concept to solution, we work
        with you to plan, develop, test, deliver, and assess your software
        needs. Our practical approach transforms the agile process from a
        mystifying undertaking to one where transparency and communication keep
        our clients happy!
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutUs',

  data() {
    return {
      breadcrumbs: [
        {
          text: this.$t('home'),
          path: 'index',
        },
        {
          text: this.$t('about-us.link'),
        },
      ],
    }
  },

  head() {
    return this.$setupHead('about-us')
  },
}
</script>

<style lang="scss" scoped>
.about-us {
  background-color: var(--white);
}
</style>
