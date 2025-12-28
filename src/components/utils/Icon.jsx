export default function Icon({ name, size }) {
  return (
    <img
      className={`size-${size} invert opacity-50`}
      src={`/icons/${name}.svg`}
      alt={`${name} icon`}
    />
  )
}