import './css/notifications.css'

export default Notification = ({ message }) => {
  let messageClass = 'notificationSuccess'
    if (message.message === null) {
      return null
    }

    if (message.type === 'error') {
      messageClass = 'notificationError'
    }
  
    return (
      <div className={messageClass}>
        {message.message}
      </div>
    )
  }