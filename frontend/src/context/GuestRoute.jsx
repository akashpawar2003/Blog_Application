
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from "./Auth"

const GuestRoute = ({children}) => {
  const {user,isLogin} = useContext(AuthContext)
  if (isLogin()) {
    return <Navigate to="/profile"/>
  }

  return children
}

export default GuestRoute