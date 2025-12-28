import Link from "next/link"

export default function DirectoryList({ directories, path }) {
  if (!directories.length) return null

  return (
    <div className="grid grid-cols-4 gap-3 mb-4">
      {directories.map((directory, index) => (
        <Link
          key={index}
          href={`${path ? `/files/${path.map(encodeURIComponent).join('/')}` : '/files'}/${encodeURIComponent(directory.name)}`}
          className={`flex gap-2 items-center px-3 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 ${directory.hidden ? 'opacity-50' : ''}`}
        >
          <img src="/icons/folder-fill.svg" alt="folder icon" className="invert size-6 opacity-50" />
          <p className="whitespace-nowrap text-ellipsis overflow-hidden">{directory.name}</p>
        </Link>
      ))}
    </div>
  )
}