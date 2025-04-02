import React, { createContext, useState } from 'react'
export const addResponseContext = createContext({})
export const editResponseContent = createContext({})
export const loginResponseContext = createContext({})
function ContextShare({ children }) {

  const [addResponse, setAddResponse] = useState([])
  const [editResponse, setEditResponse] = useState([])
  const [loginResponse, setLoginResponse] = useState(true)
  return (
    <addResponseContext.Provider value={{ addResponse, setAddResponse }}>
      <editResponseContent.Provider value={{ editResponse, setEditResponse }}>
        <loginResponseContext.Provider value={{ loginResponse, setLoginResponse }}>
          {children}
        </loginResponseContext.Provider>
      </editResponseContent.Provider>
    </addResponseContext.Provider>
  )
}

export default ContextShare