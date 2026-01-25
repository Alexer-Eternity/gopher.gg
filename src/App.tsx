import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Playground from './pages/Playground'

import "./App.css"
function App() {
    return (
        <div>


            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/playground" element={<Playground />} />
                <Route path="/resources" element={<Playground />} />

            </Routes>
        </div>
    )
}

export default App
