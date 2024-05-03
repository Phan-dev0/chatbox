import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../components/UserChat";
import PotentialChat from "../components/PotentialChat";
import { AuthContext } from "../context/AuthContext";
import ChatBox from "../components/ChatBox";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, udpateCurrentChat } =
    useContext(ChatContext);

  //   console.log("user chats: ", userChats);

  return (
    <Container>
      <PotentialChat />
      {userChats?.length < 1 ? null : (
        <Stack direction="horizontal" className="align-items-start" gap={4}>
          <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
            {isUserChatsLoading && <p>Loading chats...</p>}
            {userChats?.map((chat, index) => {
              return (
                <div key={index} onClick={() => udpateCurrentChat(chat)}>
                  <UserChat chat={chat} user={user} />
                </div>
              );
            })}
          </Stack>
          <ChatBox />
        </Stack>
      )}
    </Container>
  );
};

export default Chat;
