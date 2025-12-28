import Link from "next/link"

export default function FileList({ contents, path }) {
  return (
    <ul>
      {/* list files and folders in current directory */}
      {contents.sort(item => item.type === 'directory' ? -1 : 1).map((item, index) => {
        const { name, type } = item
        const baseStyle = "flex gap-2 items-center p-2"

        return (
          <li key={index} className={`${index + 1 !== contents.length ? 'border-b border-b-zinc-800' : ''} ${type === 'directory' ? 'hover:bg-zinc-800' : ''}`}>
            {type === 'directory' ? (
              <Link
                href={`${path ? `/files/${path.map(encodeURIComponent).join('/')}` : '/files'}/${encodeURIComponent(name)}`}
                className={baseStyle}
              >
                <img src="/icons/folder.svg" alt="folder icon" className="invert" />
                {name}
              </Link>
            ) : (
              <p className={baseStyle}>
                <img src="/icons/file.svg" alt="folder icon" className="invert" />
                {name}
              </p>
            )}
          </li>
        )
      })}
    </ul>
  )
}