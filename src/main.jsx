import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { DialogProvider } from './contexts/DialogContext.jsx'
import { DownloadDataProvider } from './contexts/DownloadDataContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DownloadDataProvider>
      <DialogProvider>
        <App />
      </DialogProvider>
    </DownloadDataProvider>
  </StrictMode>,
)
