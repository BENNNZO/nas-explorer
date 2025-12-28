export default function FileList({ files }) {
  if (!files.length) return null

  return (
    <div className="grid grid-cols-4 gap-3">
      {files.map((file, index) => (
        <div key={index} className={`aspect-square flex flex-col gap-2 p-2 bg-zinc-800 rounded-xl ${file.hidden ? 'opacity-50' : ''}`}>
          <div className="flex gap-2 items-center">
            <img src="/icons/file-fill.svg" alt="folder icon" className="invert size-5 opacity-50" />
            <p className="whitespace-nowrap text-ellipsis overflow-hidden">{file.name}</p>
          </div>

          <div className="bg-zinc-700/50 flex-1 rounded-md">
          </div>
        </div>
      ))}
    </div>
  )
}