import { useStore } from "../context/globalContext";
import "../styles.css";

export default function Notification() {
  const { state } = useStore();
  const { notification } = state;

  if (notification === null) return notification;

  return (
    <div className={notification.type === "error" ? "error" : "success"}>
      {notification.description}
    </div>
  );
}
