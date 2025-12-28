import Link from "next/link"
import Directory from "./Directory"

export default function DirectoryList({ directories, path }) {
  if (!directories.length) return null

  return (
    <div className="flex flex-col gap-1 mb-4 sm:grid sm:gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {directories.map((directory, index) => (
        <Directory directory={directory} path={path} key={index} />
      ))}
    </div>
  )
}