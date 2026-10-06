import axios from "axios"
import { useState } from "react"
import "./App.css"

function App() {
  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  function handleChange(event) {
    setPrompt(event.target.value)
  }

  async function handleClick() {
    if (!prompt.trim()) return

    setLoading(true)

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/send-prompt",
        { text: prompt }
      )

      setResult(res.data.response)
    } catch (error) {
      setResult("Something went wrong. Please try again.")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <div className="container">

        {/* Header */}
        <div className="header">

          <div className="logo">
            ✦
          </div>

          <h1>Gemini AI</h1>

          <p>
            Ask anything and get an intelligent response
          </p>

        </div>

        {/* Input Section */}
        <div className="input-card">

          <textarea
            value={prompt}
            placeholder="Enter your question...bro"
            onChange={handleChange}
          />

          <div className="bottom-bar">

            <span>
              {prompt.length} characters
            </span>

            <button
              onClick={handleClick}
              disabled={loading}
            >
              {loading ? "Generating..." : "Get Response"}

              {!loading && (
                <span className="arrow">
                  ➜
                </span>
              )}
            </button>

          </div>

        </div>

        {/* Response Section */}
        <div className="response-card">

          <div className="response-header">

            <div className="response-icon">
              ✦
            </div>

            <span>
              AI Response
            </span>

          </div>

          <div className="response-content">

            {result ? (
              <p>{result}</p>
            ) : (
              <p className="placeholder">
                Your Answer is here bruu...
              </p>
            )}

          </div>

        </div>

      </div>
    </div>
  )
}

export default App