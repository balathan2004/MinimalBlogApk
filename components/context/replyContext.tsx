import React, { useContext, useState, FC, ReactNode, useEffect } from "react";

export type replyType = string | null;
export interface ReplyContextType {
  reply: replyType;
  setReply: React.Dispatch<React.SetStateAction<replyType>>;
}
export const ReplyContext = React.createContext<ReplyContextType>({
  reply: null,
  setReply: () => {},
});

interface Props {
  children: ReactNode;
}

const ReplyHolder: FC<Props> = ({ children }) => {
  const [reply, setReply] = useState<replyType>(null);

  useEffect(() => {
    if (reply) {
      const timeoutId = setTimeout(() => {
        setReply(null);
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [reply]);

  return (
    <ReplyContext.Provider value={{ reply, setReply }}>
      {children}
    </ReplyContext.Provider>
  );
};

export const useReplyContext = () => useContext(ReplyContext);
export default ReplyHolder;
