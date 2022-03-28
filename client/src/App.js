import { useState } from 'react'

import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { Chat, Login } from './views'
import useChat from './hooks/useChat'

import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [isAuthorized, setAuthorized] = useState(false)

  const {
    activeUserName,
    users,
    messages,
    setConnect,
    sendMessage
  } = useChat()

  return (
    <>
      <Routes>
        <Route path='/' element={
          <Login setConnect={setConnect} setAuthorized={setAuthorized}/>}
        />

        <Route path={`/:roomId`} element={
          <Chat
            isAuthorized={isAuthorized}
            users={users}
            activeUserName={activeUserName}
            messages={messages}
            sendMessage={sendMessage}
          />}
        />
      </Routes>

      <ToastContainer autoClose={3000}/>
    </>
  )
}

export default App
