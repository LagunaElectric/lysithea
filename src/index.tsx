import { createRoot } from 'react-dom/client'
import * as esbuild from 'esbuild-wasm'
import { useEffect, useState, useRef } from 'react'
import { fetchPlugin } from './plugins/fetch-plugin'
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin'

const App = () => {
  const esBuildRef = useRef<any>()
  const iframe = useRef<any>()
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

    iframe.current.srcdoc = html

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

    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*')
  }

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data)
            } catch (err) {
              const root = document.querySelector('#root')
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
              console.error(err)
            }
          }, false)
        </script>
      </body>
    </html>

  `

  return <div>
    <textarea value={ input } onChange={ e => setInput(e.currentTarget.value) }></textarea>
    <div>
      <button onClick={ onClick }>submit</button>
    </div>
    <iframe sandbox='allow-scripts' title="test" srcDoc={ html } ref={ iframe } />
  </div>
}

const root = createRoot(document.getElementById('root')!)

root.render(<App />)