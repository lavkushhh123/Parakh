
function Button({
  children,
  onClick,
  type = 'button',
  disabled = false,
}) {
  return (
    <button
      className="primary-btn"
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button