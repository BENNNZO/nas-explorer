import Link from "next/link"

export default function Directory({ directory, path }) {
  return (
    <Link
      href={`${path ? `/files/${path.join('/')}` : '/files'}/${encodeURIComponent(directory.name)}`}
      className={`flex gap-2 items-center px-3 py-2 shadow-md bg-zinc-900 rounded-lg hover:bg-zinc-800 duration-75 ${directory.hidden ? 'opacity-50' : ''}`}
    >
      <img src="/icons/folder-fill.svg" alt="folder icon" className="invert size-6 opacity-50" />
      <p className="whitespace-nowrap text-ellipsis overflow-hidden">{directory.name}</p>
    </Link>
  )
}