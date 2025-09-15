function Button( {children, onClick, variant = primary, ...props}) {
  return (
    <button onClick={onClick}
    className={`button ${variant}`}
    {...props}>
      {children}
    </button>
  )
}

export default Button;