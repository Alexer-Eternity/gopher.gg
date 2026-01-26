import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Playground from './pages/Playground'
import Resources from './pages/Resources'
import Articles from './pages/Articles'
import "./App.css"
function App() {
    return (
        <div>


            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/playground" element={<Playground />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/articles" element={<Articles />} />

            </Routes>
        </div>
    )
}

export default App
