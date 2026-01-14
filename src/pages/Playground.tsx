import { useState } from 'react';
import Editor from '@monaco-editor/react'; // 1. Import the Editor
import './Playground.css';

function Playground() {
    // Keep your existing state
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

    // 2. Helper to handle editor changes
    const handleEditorChange = (value: string | undefined) => {
        setCode(value || '');
    };

    return (
        <div className="playground-container">
            <h1>Go Playground</h1>

            <div className="editor-wrapper" style={{ border: '1px solid #ccc', marginBottom: '1rem' }}>
                <Editor
                    height="400px"
                    defaultLanguage="go"
                    theme="vs-dark"
                    value={code}
                    onChange={handleEditorChange}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        scrollBeyondLastLine: false,
                    }}
                />
            </div>

            <button onClick={runCode} className="button">
                Run Code
            </button>

            <div className="output-box">
                <pre>{output}</pre>
            </div>
        </div>
    );
}

export default Playground;