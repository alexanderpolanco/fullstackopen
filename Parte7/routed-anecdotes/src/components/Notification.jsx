
export default function Notification({ notification, setNotification }) {

    if (notification === null) {
    return null;
  } else {
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  }

  return <div>{`a new anecdote ${notification} created!`}</div>;
}
