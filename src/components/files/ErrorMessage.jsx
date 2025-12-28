export default function ErrorMessage({ error }) {
  return (
    <p className="bg-red-800/20 border border-red-800/50 rounded-lg px-4 py-2 text-red-400">
      <strong>Error: </strong>{error}
    </p>
  )
}