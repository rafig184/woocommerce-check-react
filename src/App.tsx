

import './App.css'
import { ConnectionCheck } from './components/connection-check'





function App() {


  return (
    <>
      <div>
        <img src='src\assets\logoB1.png'></img>
      </div>
      <h1 className='h1'>WooCommerce בדיקת התחברות ניו אורדר עם</h1>
      <ConnectionCheck />
      <div className="footer">
        <p>2024 Ⓒ כל הזכויות שמורות לניו אורדר בע"מ</p>
      </div>
    </>
  )
}

export default App
