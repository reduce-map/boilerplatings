import Image from 'next/image'
import Link from 'next/link'

const Params = {
  content: {
    sections: [
      {
        title: 'Offline Exchange. Cash and Crypto 🤝:',
        paragraphs: [
          'Searching for profitable and trusted nearby cryptocurrency exchange points.',
        ],
      },
      {
        title: 'Exchange Aggregator 🔄:',
        paragraphs: [
          '32 Countries represented',
          '3,654 Reviews of exchanges',
          '238 Cities',
          '654 Exchanges in the database',
        ],
      },
    ],
  },
  footerText: '© 2024 My Awesome Site. All rights reserved.',
}

export default function IndexOutProducts() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <h2 className="text-base font-bold font-semibold leading-7">
            Our products
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Cryptocurrency. Exchange Points Near You 🌍:
          </p>
          <div className="mt-10 grid max-w-xl grid-cols-1 gap-8 text-base leading-7 text-gray-700 lg:max-w-none lg:grid-cols-2">
            {Params.content.sections.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold">{section.title}</h3>
                {section.paragraphs.map((paragraph, idx) => (
                  <p key={idx} className="mt-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-10 flex">
            <Link
              href="/search"
              className={`rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
            >
              Search now
            </Link>
            <Link
              href="/about"
              className={`rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
            >
              about the service
            </Link>
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden pt-16 lg:pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/*<Image*/}
          {/*  className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"*/}
          {/*  src="https://tailwindui.com/img/component-images/project-app-screenshot.png"*/}
          {/*  alt='Project app screenshot'*/}
          {/*  width={1216}*/}
          {/*  height={660}*/}
          {/*/>*/}
          <div className="relative" aria-hidden="true">
            <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%]" />
          </div>
        </div>
      </div>
    </div>
  )
}
