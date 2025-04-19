import React, { useState } from 'react'
import './App.css'
import WelcomeScreen from './components/WelcomeScreen'
import RoomsList from './components/RoomsList'
import MemeDemo from './components/MemeDemo'
import { UserProvider, useUser } from './context/UserContext'
import socketManager from './socket/socketManager'

// Main App wrapper with UserProvider context
function AppWithProvider() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  )
}

// App content that uses the user context
function AppContent() {
  const { isLoggedIn } = useUser()
  const [showDemo, setShowDemo] = useState(false)

  // Demo modunu açıp kapatmak için
  const toggleDemo = () => {
    setShowDemo(!showDemo)
  }

  // Eğer demo modu açıksa, demo bileşenini göster
  if (showDemo) {
    return (
      <div className="app">
        <MemeDemo />
        <button
          onClick={() => {
            // Demo modundan çıkarken socket bağlantısını yeniden başlat
            socketManager.reconnect();
            toggleDemo();
          }}
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            padding: '10px 15px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            zIndex: 1000
          }}
        >
          Demo Modundan Çık
        </button>
      </div>
    )
  }

  // Normal uygulama görünümü
  return (
    <div className="app">
      {isLoggedIn ? <RoomsList /> : <WelcomeScreen />}
      <button
        onClick={toggleDemo}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          padding: '10px 15px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          zIndex: 1000
        }}
      >
        Meme Demo Modunu Aç
      </button>
    </div>
  )
}

export default AppWithProvider
