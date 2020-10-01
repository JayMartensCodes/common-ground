import React from "react";
import Button from "react-bootstrap/Button";

function Logout({setUser}) {
  
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <Button onClick={logout} >
      LogOut
    </Button>
  )
}

export default Logout;