import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './Contexts/AuthContextProvider.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <ChakraProvider>
    <BrowserRouter>
        <AuthContextProvider >
           <App />
        </AuthContextProvider>
    </BrowserRouter>
  </ChakraProvider>
  </Provider>
    
)
