import Link from "next/link"

export default function DirectoryList({ directories, path }) {
  return (
    <div>
      {directories.map((directory, index) => (
        <Link
          key={index}
          href={`${path ? `/files/${path.map(encodeURIComponent).join('/')}` : '/files'}/${encodeURIComponent(directory.name)}`}
          className="flex gap-2 items-center p-2"
        >
          <img src="/icons/folder.svg" alt="folder icon" className="invert" />
          {directory.name}
        </Link>
      ))}
    </div>
  )
}