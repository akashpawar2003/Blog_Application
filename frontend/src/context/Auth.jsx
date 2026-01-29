import React, { createContext ,useState} from 'react'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const userInfo = localStorage.getItem("token");
  const [user, setUser] = useState(userInfo);

  const login = (user) => {
    setUser(user)
  }

  const isLogin = () => {
    return user ? true : false
  }

  const isLogout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }
  return(
    <AuthContext.Provider value={{user,login,isLogin,isLogout}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext