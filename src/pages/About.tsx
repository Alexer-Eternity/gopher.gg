import { Link } from 'react-router-dom'
import goLogo from '/gopher.svg'

function About() {
    return (
        <div>
            <h2>A site about the go programming language</h2>
            <div>
            <img src={goLogo} className="logo" alt="Go logo" />
            </div>
            <Link to="/">Home</Link>
        </div>
    )
}

export default About
