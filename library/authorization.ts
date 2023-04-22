import { createContext, useContext, useEffect, useState } from 'react';
import { retrievePassword, retrieveUserName } from './storeLocalValue';

interface UserCredentials {
  username: string;
  password: string;
}

interface AuthContextValue {
  username: string;
  password: string;
  setCredentials: (credentials: UserCredentials) => void;
}

const AuthContext = createContext<AuthContextValue>({
  username: '',
  password: '',
  setCredentials: () => {},
});

export function useAuth() {
  const [storedUserName, setStoredUsername] = useState("");
  const [storedPassword, setStoredPassword] = useState("");

  useEffect(() => {
    getValues();

    async function getValues() {
        let userName = await retrieveUserName();
        let password = await retrievePassword();

        setStoredUsername(userName);
        setStoredPassword(password);
    }
  }, []);

  const { username, password, setCredentials } = useContext(AuthContext);

  const updateCredentials = (newCredentials: UserCredentials) => {
    setCredentials(newCredentials);
  };

  if(username && password) {
    setCredentials({username: storedUserName, password: storedPassword});
  }

  return [username, password, updateCredentials] as const;
}