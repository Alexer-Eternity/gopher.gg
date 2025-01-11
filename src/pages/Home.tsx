import { useState } from 'react'
import { Link } from 'react-router-dom'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
function Home() {
    const [count, setCount] = useState(0)
    return (
        <div>

            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Main site currently under Development
                    <br />
                    For now, you can use the <Link to="/playground">playground</Link>
                </p>
                <p>
                    Built With Vite and React
                </p>
            </div>
            <div>
            <img src={viteLogo} className="logo" alt="Vite logo" />
            <img src={reactLogo} className="logo react" alt="React logo" />
            </div>
            <Link to="/about">About</Link>
        </div>
    )
}

export default Home
