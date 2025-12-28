import Link from "next/link"

export default function FileList({ contents, path }) {
  return (
    <ul>
      {/* list files and folders in current directory */}
      {contents.sort(item => item.type === 'directory' ? -1 : 1).map((item, index) => {
        const { name, type } = item

        return (
          <li key={index}>
            {type === 'directory' ? (
              <Link href={`${path ? `/files/${path.map(encodeURIComponent).join('/')}` : '/files'}/${encodeURIComponent(name)}`}>
                📁 {name}
              </Link>
            ) : (
              <p>{name}</p>
            )}
          </li>
        )
      })}
    </ul>
  )
}