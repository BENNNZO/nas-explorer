// yes I know that breadcrumbs is one word but I really like how it looks when the 'C' is capital lol

import { Fragment } from "react"
import Link from "next/link"

export default function Breadcrumbs({ path }) {
  const baseStyle = "text-cap-center px-3 py-1 rounded-full"
  const selectedStyle = "underline"

  return (
    <div className="flex items-center text-2xl font-medium h-8">
      <Link
        href="/files"
        className={`p-1 rounded-full ${!path ? selectedStyle : 'hover:bg-zinc-800'}`}
      >
        <img src="/icons/house-fill.svg" alt="house icon" className="invert size-6" />
      </Link>

      {path && path.map((segment, index) => (
        <Fragment key={index}>
          <img src="/icons/caret-right-bold.svg" alt="caret right icon" className="invert size-6 opacity-25" />

          {index === path.length - 1 ? (
            // currently opened folder
            <p className={`${baseStyle} ${selectedStyle}`}>
              {decodeURIComponent(segment)}
            </p>
          ) : (
            // Build href from path segments up to current index: ['a','b','c'] at index 1 → /files/a/b
            <Link
              href={`/files/${path.slice(0, index + 1).join('/')}`}
              className={`${baseStyle} hover:bg-zinc-800`}
            >
              {decodeURIComponent(segment)}
            </Link>
          )}
        </Fragment>
      ))}
    </div>
  )
}