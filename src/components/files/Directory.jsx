import Link from "next/link"
import Icon from "../utils/Icon"

export default function Directory({ directory, path }) {
  return (
    <Link
      href={`${path ? `/files/${path.join('/')}` : '/files'}/${encodeURIComponent(directory.name)}`}
      className={`flex gap-2 items-center px-3 py-2 shadow-md rounded-lg duration-75 ${directory.hidden ? 'bg-zinc-900/50 hover:bg-zinc-800/50' : 'bg-zinc-900 hover:bg-zinc-800'}`}
    >
      <Icon name="folder-fill" size={6} />
      <p className="whitespace-nowrap text-ellipsis overflow-hidden">{directory.name}</p>
    </Link>
  )
}