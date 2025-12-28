export default function Icon({ name, size, ...props }) {
  return (
    <img
      className={`size-${size || 5} ${props.className || props.class || 'invert opacity-50'}`}
      src={`/icons/${name}.svg`}
      alt={`${name} icon`}
    />
  )
}