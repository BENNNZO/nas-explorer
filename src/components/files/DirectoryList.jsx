import Link from "next/link"

export default function DirectoryList({ directories, path }) {
  if (!directories.length) return null

  return (
    <div className="flex flex-col gap-1 mb-4 sm:grid sm:gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {directories.map((directory, index) => (
        <Link
          key={index}
          href={`${path ? `/files/${path.join('/')}` : '/files'}/${encodeURIComponent(directory.name)}`}
          className={`flex gap-2 items-center px-3 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 duration-75 ${directory.hidden ? 'opacity-50' : ''}`}
        >
          <img src="/icons/folder-fill.svg" alt="folder icon" className="invert size-6 opacity-50" />
          <p className="whitespace-nowrap text-ellipsis overflow-hidden">{directory.name}</p>
        </Link>
      ))}
    </div>
  )
}