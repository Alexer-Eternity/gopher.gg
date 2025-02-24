import { Link } from 'react-router-dom'
import goLogo from '/gopher.svg'

function About() {
    return (
        <div>
            <h1>About The Go Programming Language</h1>
            <p>Go is an open-source programming language designed to make development simple, efficient, and scalable. Created by engineers at Google—Robert Griesemer, Rob Pike, and Ken Thompson—Go was officially announced in 2009.

            </p>
            <div>
            <img src={goLogo} className="logo" alt="Go logo" />
            </div>
            <h2>Why Was Go Created?</h2>
            <p>
                The creators of Go recognized the challenges developers faced with existing languages when building large-scale, distributed systems. They wanted to combine:
            </p>
            <ul>
                <li><strong>Simplicity</strong> of Python</li>
                <li><strong>Performance</strong> of C/C++</li>
                <li><strong>Concurrent programming</strong> support for modern hardware</li>
            </ul>
            <p>The result was Go: a language that prioritizes speed, reliability, and scalability.</p>

            <h2>Key Features of Go</h2>
            <ul>
                <li><strong>Fast Compilation:</strong> Go compiles extremely quickly, making the development process seamless and efficient.</li>
                <li><strong>Concurrency:</strong> Built-in support for <em>goroutines</em> and <em>channels</em> allows developers to write highly concurrent programs effortlessly.</li>
                <li><strong>Garbage Collection:</strong> Automated memory management reduces the risk of bugs and simplifies coding.</li>
                <li><strong>Static Typing with Simplicity:</strong> Go provides the reliability of static typing with the ease of dynamic languages.</li>
                <li><strong>Standard Library:</strong> The powerful standard library includes tools for networking, file handling, web development, and more—ready to use out of the box.</li>
            </ul>

            <h2>Why Developers Love Go</h2>
            <ul>
                <li><strong>Ease of Use:</strong> Go's minimal syntax is easy to read and write, even for beginners.</li>
                <li><strong>Performance:</strong> Go compiles to machine code, offering near-native performance.</li>
                <li><strong>Scalability:</strong> Ideal for building microservices and distributed systems.</li>
                <li><strong>Community and Ecosystem:</strong> A growing, vibrant community with extensive resources and libraries.</li>
            </ul>

            <h2>What Can You Build with Go?</h2>
            <ul>
                <li>Web Applications</li>
                <li>Cloud Services and APIs</li>
                <li>Command-Line Tools</li>
                <li>Networking Tools</li>
                <li>DevOps Utilities</li>
                <li>Distributed Systems</li>
            </ul>

            <h2>Ready to Try Out Go?</h2>
            <p>
                Visit our <Link to="/playground">Playground</Link> to experiment with Go code.
            </p>
            <Link to="/">Home</Link>
        </div>
    )
}

export default About
