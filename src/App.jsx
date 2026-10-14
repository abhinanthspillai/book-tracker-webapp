import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/landing/Landing.jsx'
import Library from './pages/library/Library.jsx'
import BookDetail from './pages/detail/BookDetail.jsx'
import { APP_CONFIG } from './config/app.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path={APP_CONFIG.ROUTES.APP} element={<Library />} />
        <Route path={APP_CONFIG.ROUTES.BOOK_DETAIL} element={<BookDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
