import React from 'react'
import ReactDOM from 'react-dom/client'

import App from "./App.jsx";
import './index.css'
import ShopContextProvider from "./Context/ShopContext.jsx";
import { AuthProvider } from './Context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <ShopContextProvider>
    <App />
    </ShopContextProvider>
    </AuthProvider>
  </React.StrictMode>,
)
