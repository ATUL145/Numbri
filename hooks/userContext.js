import { createContext, useContext, useReducer } from "react";

const UserContext = createContext();
const initialState = {
  userUID: null,
};
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  console.log("User Context State:", context.state);
  return context;
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER_UID":
      return { ...state, userUID: action.payload };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const contextValue = { state, dispatch };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
