import ReactDOM from 'react-dom'
import { useEffect, useState, useRef } from 'react'
import * as esbuild from 'esbuild-wasm'
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin'

const App = () => {
  const esBuildRef = useRef<any>()
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  const startService = async () => {
    esBuildRef.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
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
      plugins: [unpkgPathPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      }
    })

    // console.log(result)

    setCode(result.outputFiles[0].text)
  }

  return <div>
    <textarea value={ input } onChange={ e => setInput(e.currentTarget.value) }></textarea>
    <div>
      <button onClick={ onClick }>submit</button>
    </div>
    <pre>{ code }</pre>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))