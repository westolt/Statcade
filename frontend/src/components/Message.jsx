import './message.css'

const Message = ({ message }) => {
  return (
    <div className={`message ${message ? 'show' : ''}`}>
      {message}
    </div>
  )
}

export default Message