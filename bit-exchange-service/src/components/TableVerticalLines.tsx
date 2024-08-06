'use client'

import { useState } from 'react'

function AvatarList({ data }: { data: any }) {
  const [tooltipContent, setTooltipContent] = useState('')
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })

  const handleMouseMove = (event: any) => {
    setTooltipPosition({ top: event.clientY + 10, left: event.clientX + 10 })
  }

  const handleMouseEnter = (description: any) => {
    setTooltipContent(description)
    setTooltipVisible(true)
  }

  const handleMouseLeave = () => {
    setTooltipVisible(false)
  }

  return (
    <div className="isolate flex -space-x-2 overflow-hidden">
      {data.map((avatar: any, index: number) => (
        <img
          key={avatar.name}
          className={`relative inline-block h-10 w-10 rounded-full ring-2 ring-white z-${50 - index * 10}`}
          src={avatar.src}
          alt={avatar.name}
          onMouseMove={handleMouseMove}
          onMouseEnter={() =>
            handleMouseEnter(
              `ID: ${avatar.id} ${avatar.name} | ${avatar.description}`,
            )
          }
          onMouseLeave={handleMouseLeave}
        />
      ))}
      {tooltipVisible && (
        <div
          className="fixed z-50 rounded bg-black px-2 py-1 text-sm text-white"
          style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  )
}

export default function TableVerticalLines({ data }: any) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            <span className={'sr-only'}>{data.h2Suffix}</span>
            {data.h2}
            <strong className={'text-xl font-bold leading-6 text-gray-900'}>
              {data.h2Prefix}
            </strong>
          </h3>
          <p className="sr-only mt-2 text-sm text-gray-700">{data.p}</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            View More
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr className="divide-x divide-gray-200">
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    {data.th1}
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {data.th2}
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    {data.th3}
                  </th>
                  <th
                    scope="col"
                    className="min-w-[185px] py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0"
                  >
                    {data.th4}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.data.map((row: any) => (
                  <tr key={row.id} className="divide-x divide-gray-200">
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
                      {row.td1}
                    </td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                      {row.td2}
                    </td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">
                      {row.td3}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">
                      <AvatarList data={row.td4} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
