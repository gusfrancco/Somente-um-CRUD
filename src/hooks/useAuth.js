import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de UserProvider");
  }
  return context;
};
