import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/landing/Landing.jsx'
import Library from './pages/library/Library.jsx'
import BookDetail from './pages/detail/BookDetail.jsx'
import { ROUTES } from './config/app.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path={ROUTES.APP} element={<Library />} />
        <Route path={ROUTES.BOOK_DETAIL} element={<BookDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
