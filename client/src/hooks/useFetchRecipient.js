import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/service";

export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  const recipientId = chat?.members?.find((id) => id !== user?._id);

  // console.log("recipientId: ", recipientId);
//   console.log("recipientUser: ", recipientUser);
//   console.log("chat: ", chat);

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return null;

      const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);

    //   console.log(response);

      if (response.error) {
        return setError(response.error);
      }

      setRecipientUser(response);
    };
    getUser();
  }, [recipientId]);

  return { recipientUser };
};
