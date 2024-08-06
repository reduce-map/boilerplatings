/*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import {
  Bars3Icon,
  CalendarDaysIcon,
  CreditCardIcon,
  EllipsisVerticalIcon,
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  UserCircleIcon,
  XMarkIcon as XMarkIconMini,
} from '@heroicons/react/20/solid'
import { BellIcon, XMarkIcon as XMarkIconOutline } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'Invoices', href: '#' },
  { name: 'Clients', href: '#' },
  { name: 'Expenses', href: '#' },
]
const invoice = {
  subTotal: '$8,800.00',
  tax: '$1,760.00',
  total: '$10,560.00',
  items: [
    {
      id: 1,
      title: 'Logo redesign',
      description: 'New logo and digital asset playbook.',
      hours: '20.0',
      rate: '$100.00',
      price: '$2,000.00',
    },
    {
      id: 2,
      title: 'Website redesign',
      description: 'Design and program new company website.',
      hours: '52.0',
      rate: '$100.00',
      price: '$5,200.00',
    },
    {
      id: 3,
      title: 'Business cards',
      description: 'Design and production of 3.5" x 2.0" business cards.',
      hours: '12.0',
      rate: '$100.00',
      price: '$1,200.00',
    },
    {
      id: 4,
      title: 'T-shirt design',
      description: 'Three t-shirt design concepts.',
      hours: '4.0',
      rate: '$100.00',
      price: '$400.00',
    },
  ],
}
const activity = [
  { id: 1, type: 'created', person: { name: 'Chelsea Hagon' }, date: '7d ago', dateTime: '2023-01-23T10:32' },
  { id: 2, type: 'edited', person: { name: 'Chelsea Hagon' }, date: '6d ago', dateTime: '2023-01-23T11:03' },
  { id: 3, type: 'sent', person: { name: 'Chelsea Hagon' }, date: '6d ago', dateTime: '2023-01-23T11:24' },
  {
    id: 4,
    type: 'commented',
    person: {
      name: 'Chelsea Hagon',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    comment: 'Called client, they reassured me the invoice would be paid by the 25th.',
    date: '3d ago',
    dateTime: '2023-01-23T15:56',
  },
  { id: 5, type: 'viewed', person: { name: 'Alex Curren' }, date: '2d ago', dateTime: '2023-01-24T09:12' },
  { id: 6, type: 'paid', person: { name: 'Alex Curren' }, date: '1d ago', dateTime: '2023-01-24T09:20' },
]
const moods = [
  { name: 'Excited', value: 'excited', icon: FireIcon, iconColor: 'text-white', bgColor: 'bg-red-500' },
  { name: 'Loved', value: 'loved', icon: HeartIcon, iconColor: 'text-white', bgColor: 'bg-pink-400' },
  { name: 'Happy', value: 'happy', icon: FaceSmileIcon, iconColor: 'text-white', bgColor: 'bg-green-400' },
  { name: 'Sad', value: 'sad', icon: FaceFrownIcon, iconColor: 'text-white', bgColor: 'bg-yellow-400' },
  { name: 'Thumbsy', value: 'thumbsy', icon: HandThumbUpIcon, iconColor: 'text-white', bgColor: 'bg-blue-500' },
  { name: 'I feel nothing', value: null, icon: XMarkIconMini, iconColor: 'text-gray-400', bgColor: 'bg-transparent' },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Exchange() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selected, setSelected] = useState(moods[5])

  return (
    <>
      {/*<header className="absolute inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10">*/}
      {/*  <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">*/}
      {/*    <div className="flex flex-1 items-center gap-x-6">*/}
      {/*      <button type="button" className="-m-3 p-3 md:hidden" onClick={() => setMobileMenuOpen(true)}>*/}
      {/*        <span className="sr-only">Open main menu</span>*/}
      {/*        <Bars3Icon className="h-5 w-5 text-gray-900" aria-hidden="true" />*/}
      {/*      </button>*/}
      {/*      <img*/}
      {/*        className="h-8 w-auto"*/}
      {/*        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"*/}
      {/*        alt="Your Company"*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*    <nav className="hidden md:flex md:gap-x-11 md:text-sm md:font-semibold md:leading-6 md:text-gray-700">*/}
      {/*      {navigation.map((item, itemIdx) => (*/}
      {/*        <a key={itemIdx} href={item.href}>*/}
      {/*          {item.name}*/}
      {/*        </a>*/}
      {/*      ))}*/}
      {/*    </nav>*/}
      {/*    <div className="flex flex-1 items-center justify-end gap-x-8">*/}
      {/*      <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">*/}
      {/*        <span className="sr-only">View notifications</span>*/}
      {/*        <BellIcon className="h-6 w-6" aria-hidden="true" />*/}
      {/*      </button>*/}
      {/*      <a href="#" className="-m-1.5 p-1.5">*/}
      {/*        <span className="sr-only">Your profile</span>*/}
      {/*        <img*/}
      {/*          className="h-8 w-8 rounded-full bg-gray-800"*/}
      {/*          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"*/}
      {/*          alt=""*/}
      {/*        />*/}
      {/*      </a>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>*/}
      {/*    <div className="fixed inset-0 z-50" />*/}
      {/*    <DialogPanel className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-4 pb-6 sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-gray-900/10">*/}
      {/*      <div className="-ml-0.5 flex h-16 items-center gap-x-6">*/}
      {/*        <button type="button" className="-m-2.5 p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(false)}>*/}
      {/*          <span className="sr-only">Close menu</span>*/}
      {/*          <XMarkIconOutline className="h-6 w-6" aria-hidden="true" />*/}
      {/*        </button>*/}
      {/*        <div className="-ml-0.5">*/}
      {/*          <a href="#" className="-m-1.5 block p-1.5">*/}
      {/*            <span className="sr-only">Your Company</span>*/}
      {/*            <img*/}
      {/*              className="h-8 w-auto"*/}
      {/*              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"*/}
      {/*              alt=""*/}
      {/*            />*/}
      {/*          </a>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div className="mt-2 space-y-2">*/}
      {/*        {navigation.map((item) => (*/}
      {/*          <a*/}
      {/*            key={item.name}*/}
      {/*            href={item.href}*/}
      {/*            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"*/}
      {/*          >*/}
      {/*            {item.name}*/}
      {/*          </a>*/}
      {/*        ))}*/}
      {/*      </div>*/}
      {/*    </DialogPanel>*/}
      {/*  </Dialog>*/}
      {/*</header>*/}

      <main>
        <header className="relative isolate pt-16">
          {/*<div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">*/}
          {/*  <div className="absolute left-16 top-full -mt-16 transform-gpu opacity-50 blur-3xl xl:left-1/2 xl:-ml-80">*/}
          {/*    <div*/}
          {/*      className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"*/}
          {/*      style={{*/}
          {/*        clipPath:*/}
          {/*          'polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)',*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*  <div className="absolute inset-x-0 bottom-0 h-px bg-gray-900/5" />*/}
          {/*</div>*/}
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
              <div className="flex items-center gap-x-6">
                <img
                  src="https://tailwindui.com/img/logos/48x48/tuple.svg"
                  alt=""
                  className="h-16 w-16 flex-none rounded-full ring-1 ring-gray-900/10"
                />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Company name <span role="img"
                                                                                     aria-label="Verified">✅</span><span
                    role="img" aria-label="Shield">📁</span><span role="img" aria-label="Ukraine Flag">🇺🇦</span></h1>
                  <div className="text-sm leading-6 text-gray-500">
                    <span className="font-bold text-gray-900">Направление обмена:</span> Кеш-Кеш, Безнал - Кеш, Кеш
                    -Крипта
                  </div>
                  <div className="text-sm leading-6 text-gray-500">
                    Присоединился 2022-10-05 | Обновление курсов 25 мин назад
                  </div>
                  <div className="text-sm leading-6 text-gray-500">
                    Пар обменов: 55 | Страна: Украина | Обменных пунктов: 99
                  </div>
                  <div className="text-sm leading-6 text-gray-500">
                    Телефон <span role="img" aria-label="Phone">📞</span> Подтверждение личности <span role="img"
                                                                                                      aria-label="Verified">✅</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="bg-blue-600 rounded-lg p-4 text-white flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm">Положительные отзывы</span>
                <span className="text-2xl font-bold">99.9% (167)</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm">Положительные</span>
                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-lg font-bold">12</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm">Отрицательные</span>
                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-lg font-bold">12</span>
              </div>
              <div className="flex flex-col items-center">
                <a href="#" className="text-sm font-semibold text-white">+Добавить отзыв</a>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="bg-gray-800 rounded-lg p-4 text-white">
              <span className="block text-sm font-bold mb-2">Варианты связи:</span>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" alt="Telegram"
                       className="h-6 w-6"/>
                  <span>your_name</span>
                </li>
                <li className="flex items-center space-x-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp"
                       className="h-6 w-6"/>
                  <span>your_name</span>
                </li>
                <li className="flex items-center space-x-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram"
                       className="h-6 w-6"/>
                  <span>your_name</span>
                </li>
                <li className="flex items-center space-x-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png" alt="Email"
                       className="h-6 w-6"/>
                  <span>your_email</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div>
              <span className="block text-sm font-bold mb-4">Адреса и филиалы: <span className="text-gray-300">Киев, Харьков</span></span>
              <div className="flex space-x-4">

                <div className="bg-gray-800 rounded-lg p-2 flex flex-col items-center">
                  <img src="https://via.placeholder.com/150" alt="Map" className="rounded-lg"/>
                  <div className="mt-2 text-white text-center">
                    <div>Киев, Хрещатик 12</div>
                    <div className="text-sm text-gray-400">2,2 км от центра</div>
                    <div className="text-sm text-green-400">Открыто до 19:00</div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-2 flex flex-col items-center">
                  <img src="https://via.placeholder.com/150" alt="Map" className="rounded-lg"/>
                  <div className="mt-2 text-white text-center">
                    <div>Киев, Хрещатик 12</div>
                    <div className="text-sm text-gray-400">2,2 км от центра</div>
                    <div className="text-sm text-green-400">Открыто до 19:00</div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-2 flex flex-col items-center">
                  <img src="https://via.placeholder.com/150" alt="Map" className="rounded-lg"/>
                  <div className="mt-2 text-white text-center">
                    <div>Киев, Хрещатик 12</div>
                    <div className="text-sm text-gray-400">2,2 км от центра</div>
                    <div className="text-sm text-green-400">Открыто до 19:00</div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-2 flex flex-col items-center">
                  <img src="https://via.placeholder.com/150" alt="Map" className="rounded-lg"/>
                  <div className="mt-2 text-white text-center">
                    <div>Киев, Хрещатик 12</div>
                    <div className="text-sm text-gray-400">2,2 км от центра</div>
                    <div className="text-sm text-green-400">Открыто до 19:00</div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-2 flex flex-col items-center justify-center">
                  <span className="text-2xl text-gray-400">...</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
              <div className="flex items-center gap-x-6">
                <img
                  src="https://tailwindui.com/img/logos/48x48/tuple.svg"
                  alt=""
                  className="h-16 w-16 flex-none rounded-full ring-1 ring-gray-900/10"
                />
                <h1>
                  <div className="mt-1 text-base font-semibold leading-6 text-gray-900">Company name ✅📁🇺🇦</div>
                  <div className="text-sm leading-6 text-gray-500">
                    Направление обмена: Кеш-Кеш, Безнал - Кеш, Кеш -Крипта <span className="text-gray-700">#00011</span>
                  </div>
                  <div className="text-sm leading-6 text-gray-500">
                    Направление обмена: Кеш-Кеш, Безнал - Кеш, Кеш -Крипта <span className="text-gray-700">#00011</span>
                  </div>
                </h1>
              </div>
              <div className="flex items-center gap-x-4 sm:gap-x-6">
                <button type="button" className="hidden text-sm font-semibold leading-6 text-gray-900 sm:block">
                  Copy URL
                </button>
                <a href="#" className="hidden text-sm font-semibold leading-6 text-gray-900 sm:block">
                  Edit
                </a>
                <a
                  href="#"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Send
                </a>

                <Menu as="div" className="relative sm:hidden">
                  <MenuButton className="-m-3 block p-3">
                    <span className="sr-only">More</span>
                    <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" aria-hidden="true"/>
                  </MenuButton>

                  <MenuItems

                    className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <MenuItem>
                      {({focus}) => (
                        <button
                          type="button"
                          className={classNames(
                            focus ? 'bg-gray-50' : '',
                            'block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900',
                          )}
                        >
                          Copy URL
                        </button>
                      )}
                    </MenuItem>
                    <MenuItem>
                      {({focus}) => (
                        <a
                          href="#"
                          className={classNames(
                            focus ? 'bg-gray-50' : '',
                            'block px-3 py-1 text-sm leading-6 text-gray-900',
                          )}
                        >
                          Edit
                        </a>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div>
              <span className="block text-lg font-bold mb-4">Актуальные курсы валют от “Company name”</span>
              <div className="flex space-x-4 text-sm font-semibold mb-4">
                <a href="#" className="text-blue-600">Криптовалюты</a>
                <a href="#" className="text-gray-600">Наличные</a>
                <a href="#" className="text-gray-600">OTC</a>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center mb-4">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-l-lg">Розница</button>
                  <button className="flex-1 bg-gray-200 text-gray-600 py-2 rounded-r-lg">Опт (от 500 у.е)</button>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Валюта</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Покупка</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Продажа</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600"></th>
                  </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2 text-sm text-gray-900">Курс USD/UA</td>
                    <td className="px-4 py-2 text-sm text-blue-600 font-bold">41.1</td>
                    <td className="px-4 py-2 text-sm text-blue-600 font-bold">41.1</td>
                    <td className="px-4 py-2 text-sm text-gray-400"><img src="https://via.placeholder.com/24"
                                                                         alt="Icon"/></td>
                  </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div>
              <span className="block text-lg font-bold mb-4">Калькулятор валют от “Company name”</span>
              <div className="bg-white rounded-lg shadow p-4 mb-4">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Введите сумму</label>
                    <input type="text"
                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                           placeholder="Введите сумму"/>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Из</label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                      <option>UAH</option>

                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">В</label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                      <option>USD</option>

                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Город</label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                      <option>Киев</option>

                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Результат</label>
                    <input type="text"
                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                           value="999999" readOnly/>
                  </div>
                  <div className="flex-1 flex items-end">
                    <button
                      className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Обменять <span className="ml-2">🔄</span>
                    </button>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-gray-800 rounded-lg p-4 text-white w-1/3">
                    <span className="block text-sm font-bold mb-2">Варианты связи:</span>
                    <ul className="space-y-2">
                      <li className="flex items-center space-x-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" alt="Telegram"
                             className="h-6 w-6"/>
                        <span>your_name</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp"
                             className="h-6 w-6"/>
                        <span>your_name</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                             alt="Instagram" className="h-6 w-6"/>
                        <span>your_name</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Font_Awesome_5_brands_google.svg"
                             alt="Website" className="h-6 w-6"/>
                        <span>your_site</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/61/Phone_font_awesome.svg"
                             alt="Phone" className="h-6 w-6"/>
                        <span>your_number</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png" alt="Email"
                             className="h-6 w-6"/>
                        <span>your_email</span>
                      </li>
                    </ul>
                  </div>
                  <div className="w-2/3">
                    <span className="block text-sm font-bold mb-2">Адреса и филиалы: Киев</span>
                    <div className="flex space-x-4">

                      <div className="bg-gray-800 rounded-lg p-2 flex flex-col items-center">
                        <img src="https://via.placeholder.com/150" alt="Map" className="rounded-lg"/>
                        <div className="mt-2 text-white text-center">
                          <div>Киев, Хрещатик 12</div>
                          <div className="text-sm text-gray-400">2,2 км от центра</div>
                          <div className="text-sm text-green-400">Открыто до 19:00</div>
                        </div>
                      </div>

                      <div className="bg-gray-800 rounded-lg p-2 flex flex-col items-center">
                        <img src="https://via.placeholder.com/150" alt="Map" className="rounded-lg"/>
                        <div className="mt-2 text-white text-center">
                          <div>Киев, Хрещатик 12</div>
                          <div className="text-sm text-gray-400">2,2 км от центра</div>
                          <div className="text-sm text-green-400">Открыто до 19:00</div>
                        </div>
                      </div>

                      <div className="bg-gray-800 rounded-lg p-2 flex flex-col items-center justify-center">
                        <span className="text-2xl text-gray-400">...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div
            className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {/* Invoice summary */}
            <div className="lg:col-start-3 lg:row-end-1">
              <h2 className="sr-only">Summary</h2>
              <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                <dl className="flex flex-wrap">
                  <div className="flex-auto pl-6 pt-6">
                    <dt className="text-sm font-semibold leading-6 text-gray-900">Amount</dt>
                    <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">$10,560.00</dd>
                  </div>
                  <div className="flex-none self-end px-6 pt-4">
                    <dt className="sr-only">Status</dt>
                    <dd
                      className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
                      Paid
                    </dd>
                  </div>
                  <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                    <dt className="flex-none">
                      <span className="sr-only">Client</span>
                      <UserCircleIcon className="h-6 w-5 text-gray-400" aria-hidden="true"/>
                    </dt>
                    <dd className="text-sm font-medium leading-6 text-gray-900">Alex Curren</dd>
                  </div>
                  <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                    <dt className="flex-none">
                      <span className="sr-only">Due date</span>
                      <CalendarDaysIcon className="h-6 w-5 text-gray-400" aria-hidden="true"/>
                    </dt>
                    <dd className="text-sm leading-6 text-gray-500">
                      <time dateTime="2023-01-31">January 31, 2023</time>
                    </dd>
                  </div>
                  <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                    <dt className="flex-none">
                      <span className="sr-only">Status</span>
                      <CreditCardIcon className="h-6 w-5 text-gray-400" aria-hidden="true"/>
                    </dt>
                    <dd className="text-sm leading-6 text-gray-500">Paid with MasterCard</dd>
                  </div>
                </dl>
                <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
                  <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                    Download receipt <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Invoice */}
            <div
              className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
              <h2 className="text-base font-semibold leading-6 text-gray-900">Invoice</h2>
              <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
                <div className="sm:pr-4">
                  <dt className="inline text-gray-500">Issued on</dt>
                  {' '}
                  <dd className="inline text-gray-700">
                    <time dateTime="2023-23-01">January 23, 2023</time>
                  </dd>
                </div>
                <div className="mt-2 sm:mt-0 sm:pl-4">
                  <dt className="inline text-gray-500">Due on</dt>
                  {' '}
                  <dd className="inline text-gray-700">
                    <time dateTime="2023-31-01">January 31, 2023</time>
                  </dd>
                </div>
                <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
                  <dt className="font-semibold text-gray-900">From</dt>
                  <dd className="mt-2 text-gray-500">
                    <span className="font-medium text-gray-900">Acme, Inc.</span>
                    <br/>
                    7363 Cynthia Pass
                    <br/>
                    Toronto, ON N3Y 4H8
                  </dd>
                </div>
                <div className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
                  <dt className="font-semibold text-gray-900">To</dt>
                  <dd className="mt-2 text-gray-500">
                    <span className="font-medium text-gray-900">Tuple, Inc</span>
                    <br/>
                    886 Walter Street
                    <br/>
                    New York, NY 12345
                  </dd>
                </div>
              </dl>
              <table className="mt-16 w-full whitespace-nowrap text-left text-sm leading-6">
                <colgroup>
                  <col className="w-full"/>
                  <col/>
                  <col/>
                  <col/>
                </colgroup>
                <thead className="border-b border-gray-200 text-gray-900">
                <tr>
                  <th scope="col" className="px-0 py-3 font-semibold">
                    Projects
                  </th>
                  <th scope="col" className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">
                    Hours
                  </th>
                  <th scope="col" className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">
                    Rate
                  </th>
                  <th scope="col" className="py-3 pl-8 pr-0 text-right font-semibold">
                    Price
                  </th>
                </tr>
                </thead>
                <tbody>
                {invoice.items.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="max-w-0 px-0 py-5 align-top">
                      <div className="truncate font-medium text-gray-900">{item.title}</div>
                      <div className="truncate text-gray-500">{item.description}</div>
                    </td>
                    <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                      {item.hours}
                    </td>
                    <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                      {item.rate}
                    </td>
                    <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">{item.price}</td>
                  </tr>
                ))}
                </tbody>
                <tfoot>
                <tr>
                  <th scope="row" className="px-0 pb-0 pt-6 font-normal text-gray-700 sm:hidden">
                    Subtotal
                  </th>
                  <th
                    scope="row"
                    colSpan={3}
                    className="hidden px-0 pb-0 pt-6 text-right font-normal text-gray-700 sm:table-cell"
                  >
                    Subtotal
                  </th>
                  <td className="pb-0 pl-8 pr-0 pt-6 text-right tabular-nums text-gray-900">{invoice.subTotal}</td>
                </tr>
                <tr>
                  <th scope="row" className="pt-4 font-normal text-gray-700 sm:hidden">
                    Tax
                  </th>
                  <th
                    scope="row"
                    colSpan={3}
                    className="hidden pt-4 text-right font-normal text-gray-700 sm:table-cell"
                  >
                    Tax
                  </th>
                  <td className="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-gray-900">{invoice.tax}</td>
                </tr>
                <tr>
                  <th scope="row" className="pt-4 font-semibold text-gray-900 sm:hidden">
                    Total
                  </th>
                  <th
                    scope="row"
                    colSpan={3}
                    className="hidden pt-4 text-right font-semibold text-gray-900 sm:table-cell"
                  >
                    Total
                  </th>
                  <td className="pb-0 pl-8 pr-0 pt-4 text-right font-semibold tabular-nums text-gray-900">
                    {invoice.total}
                  </td>
                </tr>
                </tfoot>
              </table>
            </div>

            <div className="lg:col-start-3">
              {/* Activity feed */}
              <h2 className="text-sm font-semibold leading-6 text-gray-900">Activity</h2>
              <ul role="list" className="mt-6 space-y-6">
                {activity.map((activityItem, activityItemIdx) => (
                  <li key={activityItem.id} className="relative flex gap-x-4">
                    <div
                      className={classNames(
                        activityItemIdx === activity.length - 1 ? 'h-6' : '-bottom-6',
                        'absolute left-0 top-0 flex w-6 justify-center',
                      )}
                    >
                      <div className="w-px bg-gray-200" />
                    </div>
                    {activityItem.type === 'commented' ? (
                      <>
                        <img
                          src={activityItem.person.imageUrl}
                          alt=""
                          className="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50"
                        />
                        <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                          <div className="flex justify-between gap-x-4">
                            <div className="py-0.5 text-xs leading-5 text-gray-500">
                              <span className="font-medium text-gray-900">{activityItem.person.name}</span> commented
                            </div>
                            <time
                              dateTime={activityItem.dateTime}
                              className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                            >
                              {activityItem.date}
                            </time>
                          </div>
                          <p className="text-sm leading-6 text-gray-500">{activityItem.comment}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                          {activityItem.type === 'paid' ? (
                            <CheckCircleIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                          ) : (
                            <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                          )}
                        </div>
                        <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                          <span className="font-medium text-gray-900">{activityItem.person.name}</span>{' '}
                          {activityItem.type} the invoice.
                        </p>
                        <time
                          dateTime={activityItem.dateTime}
                          className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                        >
                          {activityItem.date}
                        </time>
                      </>
                    )}
                  </li>
                ))}
              </ul>

              {/* New comment form */}
              <div className="mt-6 flex gap-x-3">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  className="h-6 w-6 flex-none rounded-full bg-gray-50"
                />
                <form action="#" className="relative flex-auto">
                  <div className="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                    <label htmlFor="comment" className="sr-only">
                      Add your comment
                    </label>
                    <textarea
                      rows={2}
                      name="comment"
                      id="comment"
                      className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Add your comment..."
                      defaultValue={''}
                    />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
                    <div className="flex items-center space-x-5">
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                        >
                          <PaperClipIcon className="h-5 w-5" aria-hidden="true" />
                          <span className="sr-only">Attach a file</span>
                        </button>
                      </div>
                      <div className="flex items-center">
                        <Listbox value={selected} onChange={setSelected}>
                          {({ open }) => (
                            <>
                              <Label className="sr-only">Your mood</Label>
                              <div className="relative">
                                <ListboxButton className="relative -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                                  <span className="flex items-center justify-center">
                                    {selected.value === null ? (
                                      <span>
                                        <FaceSmileIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                        <span className="sr-only">Add your mood</span>
                                      </span>
                                    ) : (
                                      <span>
                                        <span
                                          className={classNames(
                                            selected.bgColor,
                                            'flex h-8 w-8 items-center justify-center rounded-full',
                                          )}
                                        >
                                          <selected.icon
                                            className="h-5 w-5 flex-shrink-0 text-white"
                                            aria-hidden="true"
                                          />
                                        </span>
                                        <span className="sr-only">{selected.name}</span>
                                      </span>
                                    )}
                                  </span>
                                </ListboxButton>

                                <ListboxOptions

                                  className="absolute z-10 -ml-6 mt-1 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:ml-auto sm:w-64 sm:text-sm"
                                >
                                  {moods.map((mood) => (
                                    <ListboxOption
                                      key={mood.value}
                                      className={({ focus }) =>
                                        classNames(
                                          focus ? 'bg-gray-100' : '',
                                          !focus ? 'bg-white' : '',
                                          'relative cursor-default select-none px-3 py-2',
                                        )
                                      }
                                      value={mood}
                                    >
                                      <div className="flex items-center">
                                        <div
                                          className={classNames(
                                            mood.bgColor,
                                            'flex h-8 w-8 items-center justify-center rounded-full',
                                          )}
                                        >
                                          <mood.icon
                                            className={classNames(mood.iconColor, 'h-5 w-5 flex-shrink-0')}
                                            aria-hidden="true"
                                          />
                                        </div>
                                        <span className="ml-3 block truncate font-medium">{mood.name}</span>
                                      </div>
                                    </ListboxOption>
                                  ))}
                                </ListboxOptions>
                              </div>
                            </>
                          )}
                        </Listbox>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Comment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
