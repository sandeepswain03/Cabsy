import { createContext, ReactNode } from "react";

const UserContext = createContext({});

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const user = "sandeep"
  return (
    <div>
      <UserContext.Provider value={user}>{children}</UserContext.Provider>
    </div>
  );
};

export { UserContext, UserContextProvider };
