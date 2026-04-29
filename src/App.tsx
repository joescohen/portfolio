import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { ANGARSProject } from './pages/ANGARSProject'
import { VoyageProject } from './pages/VoyageProject'
import { GarraProject } from './pages/GarraProject'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects/angars" element={<ANGARSProject />} />
        <Route path="/projects/voyage" element={<VoyageProject />} />
        <Route path="/projects/garra" element={<GarraProject />} />
      </Routes>
    </BrowserRouter>
  )
}
