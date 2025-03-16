import { useState } from 'react';
import './Playground.css';

function Playground() {
    const [code, setCode] = useState<string>('package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, World!")\n}');
    const [output, setOutput] = useState<string>('');

    const runCode = async () => {
        try {
            const requestBody = {
                version: '2',
                body: code,
            };

            const response = await fetch('https://www.gopher.gg/api/playground-proxy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const result = await response.json();

            if (result.Errors && result.Errors !== '') {
                setOutput(result.Errors);
            } else if (result.Events && result.Events.length > 0) {
                const outputMessages = result.Events.map((event: any) => event.Message).join('');
                setOutput(outputMessages);
            } else {
                setOutput('Unexpected response format.');
            }
        } catch (error) {
            setOutput('Error running code. Please try again.');
        }
    };

    return (
        <div className="playground-container">
            <h1>Go Playground</h1>
            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={15}
                cols={80}
                className="textarea"
            ></textarea>
            <br />
            <button onClick={runCode} className="button">
                Run Code
            </button>
            <div className="output-box">
                {output}  {/* This will display the Go code output */}
            </div>
        </div>
    );
}

export default Playground;
