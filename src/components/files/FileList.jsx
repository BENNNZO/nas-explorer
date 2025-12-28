export default function FileList({ files }) {
  if (!files.length) return null

  return (
    <div className="flex flex-col gap-1 sm:grid sm:gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {files.map((file, index) => (
        <div key={index} className={`sm:aspect-square flex flex-col gap-2 p-2 bg-zinc-800 rounded-xl ${file.hidden ? 'opacity-50' : ''}`}>
          <div className="flex gap-2 items-center">
            <img src="/icons/file-fill.svg" alt="folder icon" className="invert size-5 opacity-50" />
            <p className="whitespace-nowrap text-ellipsis overflow-hidden">{file.name}</p>
          </div>

          <div className="hidden sm:block bg-zinc-700/50 flex-1 rounded-md">
          </div>
        </div>
      ))}
    </div>
  )
}