import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { baseUrl, getRequest } from "../utils/service";

export const useFetchLastestMessage = (chat) => {
    const {newMessage, notifications} = useContext(ChatContext);
    const [latestMessage, setLastestMessage] = useState(null);

    // console.log("latestMessage: ", latestMessage);

    useEffect(() => {
        const getMessages = async () => {
            const response = await getRequest(`${baseUrl}/messages/${chat?._id}`);

            // console.log("res: ", response);
            
            if(response.error) {
                return console.log("Error....", error);
            }

            const lastMessage = response[response?.length - 1];

            // console.log("l: ", lastMessage);

            setLastestMessage(lastMessage);
        };
        getMessages();
    }, [newMessage, notifications]);

    return {latestMessage};
};