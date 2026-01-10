import './message.css'

const Message = ({ message, type }) => {
  return (
    <div className={`message ${message ? 'show' : ''} ${type || 'normal'}`}>
      {message}
    </div>
  )
}

export default Message