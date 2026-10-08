
function ProgressBar({ value = 0, label }) {
  return (
    <div className="progress-container">

      {/* Label and percentage */}
      <div className="progress-header">
        <span>{label}</span>
        <span>{value}%</span>
      </div>

      {/* Progress bar */}
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${value}%` }}
        ></div>
      </div>

    </div>
  )
}

export default ProgressBar