import { createRoot } from 'react-dom/client'
import TextEditor from './components/text-editor'
import 'bulmaswatch/superhero/bulmaswatch.min.css'

const App = () => {
  return (
    <div>
      <TextEditor />
    </div>
  )
}

const root = createRoot(document.getElementById('root')!)

root.render(<App />)