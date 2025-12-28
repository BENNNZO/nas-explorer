export default function FileList({ files }) {
  return (
    <div>
      {files.map((item, index) => (
        <p key={index} className="flex gap-2 items-center p-2">
          <img src="/icons/file.svg" alt="folder icon" className="invert" />
          {item.name}
        </p>
      ))}
    </div>
  )
}