import { createContext } from "react";

interface IAuthContextData {
  isAuthenticated: boolean;
  login: () => Promise<string | void>;
}

const AuthContext = createContext({});

export const AuthProvider: React.FC = () => {
  return <div></div>;
};
