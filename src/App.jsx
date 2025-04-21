import React, { useEffect, useState } from 'react'
import './App.css'
import { useUser } from './context/UserContext'
import GameRoom from './components/GameRoom'
import ErrorPage from './components/ErrorPage'

// App content that uses the user context
function AppContent() {
  const { user, login } = useUser()
  const [error, setError] = useState(null)

  useEffect(()=>{
    if(!user){
      const userName = new URLSearchParams(window.location.search).get("name");
      fetch("https://api.topluyo.com/user/info/"+userName,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response)=>{
        if(response.ok){
          return response.json()
        }else{
          throw new Error("Kullanıcı bulunamadı.")
        }
      }).then((data)=>{
        if(data && data.data){
          const {nick, image} = data.data
          login({name: nick, img: image});
        }else{
          throw new Error("Kullanıcı bulunamadı.")
        }
      }).catch((error)=>{
        setError(error.message)
        console.error("Kullanıcı bilgileri alınamadı:", error);
      })
    }
  },[])

  if(error){
    return <ErrorPage error={error} />
  }

  if(!user) {
    return (
      <div>
        <p>Giriş Yapılamadı.</p>
      </div>
    )
  }
  // Normal uygulama görünümü
  return (
    <div className="app">
      <GameRoom/>
    </div>
  )
}

export default AppContent
