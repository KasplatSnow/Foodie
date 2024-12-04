import { PropsWithChildren, useState, createContext } from "react";
 
export const LoginContext = createContext({
  userName: '',
  setUserName: (userName: string) => {},
  accessToken: '',
  setAccessToken: (accessToken: string) => {},
  id: '',
  setId: (id: string) => {},
  view: 'Login',
  setView: (view: string) => {} 
});

export const LoginProvider = ({ children }: PropsWithChildren<{}>) => {
  const [userName, setUserName] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [view, setView] = useState('Login');
  const [id, setId] = useState('')
  return (
    <LoginContext.Provider value={{ userName, setUserName, accessToken, setAccessToken, view, setView, id, setId}}>
      {children}
    </LoginContext.Provider>
  );
};