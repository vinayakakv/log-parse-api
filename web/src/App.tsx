import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File|null>(null)

  const submitForm = async () => {
    setLoading(true)
    console.log(file)
    const formData = new FormData()
    formData.append("file", file!)
    const {data} = await fetch("/api/parse", {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .catch(e => alert(JSON.stringify(e, null, 2)))
      .finally(() => setLoading(false))
    const blob = new Blob([JSON.stringify(data)], {type: "application/json"})
    const url  = URL.createObjectURL(blob)
    const a = document.createElement('a');
    a.href = url
    a.target = "_blank"
    a.download = "result.json"
    a.click()
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Log Parser App Frontend</h1>
        <form>
          <input type="file" name="file" accept="text/plain" onChange={(e) => setFile(e.target.files && e.target.files[0])}/>
          <button type="submit" onClick={async (e)=> {
            e.preventDefault()
            await submitForm()
          }}>Parse</button>
        </form>
      </header>
    </div>
  )
}

export default App
