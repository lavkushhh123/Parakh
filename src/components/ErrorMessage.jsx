
function ErrorMessage({ message = "Something went wrong." }) {
  return (
    <div className="error-message">
      <h3>Something went wrong</h3>
      <p>{message}</p>
    </div>
  )
}

export default ErrorMessage
