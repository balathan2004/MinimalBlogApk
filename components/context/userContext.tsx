import React, { useContext, useState, FC, ReactNode } from "react";
import { UserDataInterface } from "../interfaces";

export interface UserContextType {
  userCred: UserType;
  setUserCred: React.Dispatch<React.SetStateAction<UserType>>;
}

export const UserCredContext = React.createContext<UserContextType>({
  userCred: null,
  setUserCred: () => {},
});

interface Props {
  children: ReactNode;
}

type UserType = UserDataInterface | null;

const UserCredHolder: FC<Props> = ({ children }) => {
  const [userCred, setUserCred] = useState<UserType>(null);

  return (
    <UserCredContext.Provider value={{ userCred, setUserCred }}>
      {children}
    </UserCredContext.Provider>
  );
};

export const useUserContext = () => useContext(UserCredContext);

export default UserCredHolder;
