import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'       //import ChakraProvider 
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider>                                    {/* Chakra UI Provider */}
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
)
