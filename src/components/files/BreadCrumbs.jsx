// yes I know that breadcrumbs is one word but I really like how it looks when the 'C' is capital lol

import Link from "next/link"

export default function Breadcrumbs({ path }) {
  return (
    <ul className="flex gap-2">
      <li>
        <Link href="/files" className={`${!path ? 'underline' : ''}`}>
          root
        </Link>
      </li>

      {path && path.map((segment, index) => (
        <li key={segment}>
          {index === path.length - 1 ? (
            // currently opened folder
            <p className="underline">
              {decodeURIComponent(segment)}
            </p>
          ) : (
            // Build href from path segments up to current index: ['a','b','c'] at index 1 → /files/a/b
            <Link href={`/files/${path.slice(0, index + 1).join('/')}`}>
              {decodeURIComponent(segment)}
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
}