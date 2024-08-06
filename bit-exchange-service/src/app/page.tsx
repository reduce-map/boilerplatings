import Image from 'next/image'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { Testimonial } from '@/components/Testimonial'
import logoBrightPath from '@/images/clients/bright-path/logo-light.svg'
import logoFamilyFund from '@/images/clients/family-fund/logo-light.svg'
import logoGreenLife from '@/images/clients/green-life/logo-light.svg'
import logoHomeWork from '@/images/clients/home-work/logo-light.svg'
import logoMailSmirk from '@/images/clients/mail-smirk/logo-light.svg'
import logoNorthAdventures from '@/images/clients/north-adventures/logo-light.svg'
import logoPhobiaDark from '@/images/clients/phobia/logo-dark.svg'
import logoPhobiaLight from '@/images/clients/phobia/logo-light.svg'
import logoExchange from '@/images/Simplification.svg'
import logoUnseal from '@/images/clients/unseal/logo-light.svg'
import imageLaptop from '@/images/laptop.jpg'
import { type CaseStudy, type MDXEntry, loadCaseStudies } from '@/lib/mdx'

import IndexSearch from '@/components/IndexSearch'
import TableVerticalLines from '@/components/TableVerticalLines'
import ExchangeTable from '@/components/ExchangeTable'
import { Button } from '@/components/Button'
import IndexOutProducts from '@/components/IndexOutProducts'
// import LocaleSwitcher from '@/components/LocaleSwitcher';


import {Metadata} from "next";

const clients = [
  ['Phobia', logoPhobiaLight],
  ['Family Fund', logoFamilyFund],
  ['Unseal', logoUnseal],
  ['Mail Smirk', logoMailSmirk],
  ['Home Work', logoHomeWork],
  ['Green Life', logoGreenLife],
  ['Bright Path', logoExchange],
  ['North Adventures', logoNorthAdventures],
]

const Params = {
  popularExchanges: {
    h2Suffix: 'Exchange me ',
    h2: 'by ',
    h2Prefix: 'City',
    p: 'Find the best exchange rates in the crypto cities',
    th1: 'City',
    th2: 'Amount by day',
    th3: 'Exchanges amount',
    th4: 'Top 5 Exchangers',
    data: [
      {
        id: 1,
        td1: 'Kharkiv 🇺🇦',
        td2: 12983,
        td3: 111,
        td4: [
          {
            id: 1,
            name: 'Armagedon',
            src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            description: 'The best exchanger in Kharkiv',
            amount: 111111,
          },
          {
            id: 2,
            name: 'Vlastelin',
            description: 'The second best exchanger in Kharkiv',
            src: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            amount: 6996,
          },
          {
            id: 3,
            name: 'Gospodin',
            src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            description: 'Gospodin Pizdit',
            amount: 6666,
          },
          {
            id: 4,
            name: 'Anatolich',
            src: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            description: 'Anatolich Buhaet',
            amount: 12,
          },
        ],
      },
      {
        id: 2,
        td1: 'Warsaw 🇵🇱',
        td2: 1983,
        td3: 11,
        td4: [
          {
            id: 1,
            name: 'Armagedon',
            src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            description: 'The best exchanger in Kharkiv',
            amount: 111111,
          },
          {
            id: 2,
            name: 'Vlastelin',
            description: 'The second best exchanger in Kharkiv',
            src: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            amount: 6996,
          },
          {
            id: 3,
            name: 'Gospodin',
            src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            description: 'Gospodin Pizdit',
            amount: 6666,
          },
          {
            id: 4,
            name: 'Anatolich',
            src: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            description: 'Anatolich Buhaet',
            amount: 12,
          },
        ],
      },
    ],
  },
  popularExchangePairs: {
    h2Suffix: 'Exchange me ',
    h2: 'by ',
    h2Prefix: 'Popular exchange pairs',
    p: 'Find popular exchange pairs',
    th1: 'Pair',
    th2: 'Current rate',
    data: [
      {
        id: 1,
        td1: 'BTC/USD',
        td2: '50000:1',
      },
      {
        id: 2,
        td1: 'ETH/USD',
        td2: '3800:1',
      },
      {
        id: 3,
        td1: 'BTC/ETH',
        td2: '23:1',
      },
      {
        id: 4,
        td1: 'Arbitrum/USD',
        td2: '1.5:1',
      },
    ],
  },
}

function Clients() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="font-display text-center text-sm font-semibold tracking-wider text-white sm:text-left">
            We’ve worked with hundreds of amazing people
          </h2>
          <div className="h-px flex-auto bg-neutral-800" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
          >
            {clients.map(([client, logo]) => (
              <li key={client}>
                <FadeIn>
                  <Image src={logo} alt={client} unoptimized />
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}

function CaseStudies({
  caseStudies,
}: {
  caseStudies: Array<MDXEntry<CaseStudy>>
}) {
  return (
    <>
      <SectionIntro
        title="Harnessing technology for a brighter future"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          We believe technology is the answer to the world’s greatest
          challenges. It’s also the cause, so we find ourselves in bit of a
          catch 22 situation.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <FadeIn key={caseStudy.href} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                <h3>
                  <Link href={caseStudy.href}>
                    <span className="absolute inset-0 rounded-3xl" />
                    <Image
                      src={caseStudy.logo}
                      alt={caseStudy.client}
                      className="h-16 w-16"
                      unoptimized
                    />
                  </Link>
                </h3>
                <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                  <time
                    dateTime={caseStudy.date.split('-')[0]}
                    className="font-semibold"
                  >
                    {caseStudy.date.split('-')[0]}
                  </time>
                  <span className="text-neutral-300" aria-hidden="true">
                    /
                  </span>
                  <span>Case study</span>
                </p>
                <p className="font-display mt-6 text-2xl font-semibold text-neutral-950">
                  {caseStudy.title}
                </p>
                <p className="mt-4 text-base text-neutral-600">
                  {caseStudy.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  )
}

function Services() {
  return (
    <>
      <SectionIntro
        eyebrow="Grow Your Business with Us!"
        title="Exchange Services"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Increase the traffic and revenue of your exchange point by joining our
          platform. Quick and easy registration, start attracting new customers
          today.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
              <StylizedImage
                src={imageLaptop}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <ListItem title="Start your exchange in 5 minutes">
              Quick setup and launch of your exchange point.
            </ListItem>
            <ListItem title="Access to a global audience">
              Expand your market and attract customers from around the world.
            </ListItem>
            <ListItem title="Affordable rates">
              Competitive pricing for all types of exchange operations.
            </ListItem>
            <ListItem title="Custom Site Builder">
              Create a unique page for your exchange point.
            </ListItem>
            <ListItem title="24/7 support">
              Round-the-clock support to solve any questions and problems.
            </ListItem>
            <ListItem>
              {/* TODO: change link. Seems after nginx */}
              {/* Node: this is a landing / e-commerce for ex-change create service or this is internal */}
              <Button href="/contact">EXCHANGE.Create</Button>
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  )
}

export const metadata: Metadata = {
  description: 'AI-Powered Currency Exchange Aggregator',
}


interface BlogProps {
  messages: {
    blogTitle: string;
    description: string;
    readMore: string;
  };
}



const Home = async ({ params }: { params: { locale: string } }) => {
  const { locale } = params;
  console.log(locale, params, 111)

  return (
    <>
      {/* TODO Hero Section component. */}
      {/* Note: Here Hero with Core FR -> Search */}
      {/*<LocaleSwitcher/>*/}


      <Container className="mt-12 sm:mt-16 lg:mt-24">
        <FadeIn>
          <h1
            className="font-display mb-6 text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
            Service for searching currency exchange offices in Ukraine
          </h1>
          <IndexSearch/>
        </FadeIn>
      </Container>

      {/* TODO: typeof Index components. */}
      {/* Note: two responsive tables. Add TS -> content type */}
      <Container className="mt-12 sm:mt-16 lg:mt-20">
        <FadeIn className="">
          <h2 className={'text-3xl font-bold leading-6 text-gray-900'}>
            Find the best crypto exchanges with the best rates
          </h2>
          <TableVerticalLines data={Params.popularExchanges}/>
          <div
            className={
              'mt-6 grid grid-cols-1 gap-8 sm:mt-8 lg:mt-12 lg:grid-cols-2'
            }
          >
            <TableVerticalLines data={Params.popularExchanges}/>

            {/* TODO move to component*/}
            {/* Note:  */}
            <ExchangeTable data={Params.popularExchangePairs}/>
          </div>
        </FadeIn>
      </Container>

      {/* TODO: typeof Index components. */}
      {/* Note: Our products.
       - Будет отдельный сайт для  сабдомен или просто в наших проектах.
       - Возможно стоит сделать отдельный сайт для exchange.create, так как это будет отдельный продукт.
          - Что мы считаем за проект?
          - exchange.create? или create.exchange.map
       */}
      <IndexOutProducts/>

      {/* TODO: typeof Index components. Main business entity - entity / sub-entity. | SKU */}
      {/* Note: Our Services. (Атрибуты Интереса) */}
      <Services/>

      {/* TODO: typeof Index components. Main business entity - entity / sub-entity. | Templates */}
      {/*<CaseStudies caseStudies={caseStudies}/>*/}

      {/* TODO: typeof Index components. Testimonial client say */}
      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{name: 'Phobia', logo: logoPhobiaDark}}
      >
        Thank you, ExchangeMap, for making it possible to find me on the map,
        and thank you, ExchangeCreate, for enabling me to create my cash and
        crypto exchange. Now I can be more efficient.
      </Testimonial>

      {/* TODO: typeof Index components. Testimonial clients say list */}
      <Clients/>

      <ContactSection/>
    </>
  )
}

export default Home
