import { createRoot } from 'react-dom/client'
import * as esbuild from 'esbuild-wasm'
import { useEffect, useState, useRef } from 'react'
import { fetchPlugin } from './plugins/fetch-plugin'
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin'

const App = () => {
  const esBuildRef = useRef<any>()
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  const startService = async () => {
    esBuildRef.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://www.unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
    })
  }

  useEffect(() => {
    startService()
  }, [])


  const onClick = async () => {
    if (!esBuildRef.current) return

    const result = await esBuildRef.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [
        unpkgPathPlugin(),
        fetchPlugin(input)
      ],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      }
    })

    setCode(result.outputFiles[0].text)

    try {
      eval(result.outputFiles[0].text)
    } catch (err) {
      alert(err)
    }
  }

  return <div>
    <textarea value={ input } onChange={ e => setInput(e.currentTarget.value) }></textarea>
    <div>
      <button onClick={ onClick }>submit</button>
    </div>
    <pre>{ code }</pre>
    <iframe sandbox='allow-same-origin' title="test" src="/test.html" />
  </div>
}

const root = createRoot(document.getElementById('root')!)

root.render(<App />)