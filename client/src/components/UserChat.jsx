import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../hooks/useFetchRecipient";
import avarter from "../assets/avarter.svg";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { unreadNotificationsFunc } from "../hooks/unreadNotification";
import { useFetchLastestMessage } from "../hooks/userFetchLatestMessage";
import moment from "moment";

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { onlineUsers, notifications, markThisUserNotificationsAsRead } = useContext(ChatContext);

  // console.log("recipient: ", recipientUser);

  const { latestMessage } = useFetchLastestMessage(chat);

  const unreadNotifications = unreadNotificationsFunc(notifications);
  const thisUserNotifications = unreadNotifications?.filter((n) => n.senderId === recipientUser?._id);

  const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?._id);

  const truncateText = (text) => {
    let shortTest = text.substring(0, 20);

    if (text.length > 20) {
      shortTest = shortTest + "...";
    }

    return shortTest;
  }

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button"
      onClick={() => {
        if (thisUserNotifications?.length !== 0) {
          markThisUserNotificationsAsRead(thisUserNotifications, notifications);
        }
      }}
    >
      <div className="d-flex">
        <div className="me-2">
          <img src={avarter} height="35px" />
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.name}</div>
          <div className="text">
            {latestMessage?.text && (
              <span>{truncateText(latestMessage?.text)}</span>
            )}
          </div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">
          {moment(latestMessage?.createdAt).calendar()}
        </div>
        <div className={thisUserNotifications?.length > 0 ? "this-user-notifications" : ""}>
          {thisUserNotifications?.length > 0 ? thisUserNotifications?.length : ""}
        </div>
        <span className={isOnline ? "user-online" : ""}></span>
      </div>
    </Stack>
  );
};

export default UserChat;
