import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import "./app.css"
function App() {
    return (
        <div>
            <h1>Gopher.gg</h1>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </div>
    )
}

export default App
