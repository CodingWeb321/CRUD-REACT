import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './Login.jsx'



function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <div>
      {isLoggedIn?<App/>:<Login onLogin={setIsLoggedIn}/>}
    </div>
  );
}

export default Root;

createRoot(document.getElementById('root')).render(
  <Root/>
)
