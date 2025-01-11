import React, { useState } from 'react';

function Playground() {
    const [code, setCode] = useState<string>('package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, World!")\n}');
    const [output, setOutput] = useState<string>('');

    const runCode = async () => {
        try {
            // Prepare the body as application/x-www-form-urlencoded
            const formData = new URLSearchParams();
            formData.append('version', '2');
            formData.append('body', code);

            const response = await fetch('https://www.gopher.gg/api/playground-proxy/main', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
            });

            const result = await response.json();
            if (result.Errors) {
                setOutput(result.Errors);
            } else {
                setOutput(result.Events.map((event: any) => event.Message).join(''));
            }
        } catch (error) {
            setOutput('Error running code. Please try again.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Go Playground</h1>
            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={15}
                cols={80}
                style={{ fontFamily: 'monospace', fontSize: '14px', width: '100%', marginBottom: '10px' }}
            ></textarea>
            <br />
            <button onClick={runCode} style={{ marginBottom: '10px' }}>
                Run Code
            </button>
            <div
                style={{
                    border: '1px solid #ccc',
                    padding: '10px',
                    backgroundColor: '#f9f9f9',
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap',
                }}
            >
                {output}
            </div>
        </div>
    );
}

export default Playground;
