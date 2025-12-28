import File from "./File"

export default function FileList({ files }) {
  if (!files.length) return null

  return (
    <div className="flex flex-col gap-1 sm:grid sm:gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {files.map((file, index) => (
        <File file={file} key={index} />
      ))}
    </div>
  )
}