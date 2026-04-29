import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { ANGARSProject } from './pages/ANGARSProject'
import { VoyageProject } from './pages/VoyageProject'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/angars" element={<ANGARSProject />} />
        <Route path="/projects/voyage" element={<VoyageProject />} />
      </Routes>
    </BrowserRouter>
  )
}
