import { createRoot } from 'react-dom/client'
import CodeCell from './components/code-cell'
import 'bulmaswatch/superhero/bulmaswatch.min.css'

const App = () => {
  return (
    <div>
      <CodeCell />
    </div>
  )
}

const root = createRoot(document.getElementById('root')!)

root.render(<App />)