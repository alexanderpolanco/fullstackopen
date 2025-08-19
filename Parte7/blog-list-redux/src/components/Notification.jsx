import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector((state) => state.notification);

  if (!message) {
    return null;
  }

  return (
    <div className={message.type === "error" ? "error" : "success"}>
      {message.description}
    </div>
  );
};

export default Notification;
