
function Card({ title, value, description, children }) {
  return (
    <div className="info-card">

      {/* Card heading */}
      <h3>{title}</h3>

      {/* Main value */}
      {value && <h2>{value}</h2>}

      {/* Description */}
      {description && <p>{description}</p>}

      {/* Extra content if needed */}
      {children}

    </div>
  )
}

export default Card
