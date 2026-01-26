import { Link } from 'react-router-dom'
import reactLogo from '/assets/react.svg'
import viteLogo from '/assets/vite.svg'
import favicon from '/favicon.png'; // Adjust the path if necessary
function Home() {
    return (
        <div>
            <img src={favicon} alt="Site Logo" style={{width: '200px', height: '200px'}}/>

            <h1>Welcome to Gopher.gg</h1>
            <div className="card">
                <p>
                    <Link to="/playground">Playground</Link>: Experiment with Go code directly in your browser
                </p>
                <p>
                    <Link to="/about">About Go</Link>: Learn about the language, its history, and its advantages
                </p>
                <p>
                    <Link to="/resources">Resources</Link>: Tutorial, Guides, and more that help you master Go.
                </p>
                <p>
                    <Link to="/articles">Articles</Link>: Articles discussing go frameworks, libraries, best practices and etc.
                </p>
            </div>
            <div>
                <img src={viteLogo} className="logo" alt="Vite logo"/>
                <img src={reactLogo} className="logo react" alt="React logo"/>
            </div>
            <Link to="/about">About</Link>
        </div>
    )
}

export default Home
