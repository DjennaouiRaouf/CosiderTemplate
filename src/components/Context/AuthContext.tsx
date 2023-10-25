import {createContext, ReactNode, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

type Props = {
  children?: ReactNode;
}

type IAuthContext = {
  authenticated: any;
  setAuthenticated: (newState: any) => void
}

const initialValue = {
  authenticated: null,
  setAuthenticated: () => {}
}

const AuthContext = createContext<IAuthContext>(initialValue)

const AuthProvider = ({children}: Props) => {
  //Initializing an auth state with false value (unauthenticated)
  const [ authenticated, setAuthenticated ] = useState(initialValue.authenticated)

  const navigate = useNavigate()
  useEffect(() => {
    const cookies:any=Cookies.get("isAuth");
    setAuthenticated(cookies);

  });

  return (
      <AuthContext.Provider value={{authenticated, setAuthenticated}}>
        {children}
      </AuthContext.Provider>
  )
}

export {  AuthContext, AuthProvider }