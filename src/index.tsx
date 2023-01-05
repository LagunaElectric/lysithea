import { createRoot } from 'react-dom/client'
import TextEditor from './components/text-editor'
import { Provider } from 'react-redux'
import { store } from './state'
import 'bulmaswatch/superhero/bulmaswatch.min.css'

const App = () => {
  return (
    <Provider store={ store }>
      <div>
        <TextEditor />
      </div>
    </Provider>
  )
}

const root = createRoot(document.getElementById('root')!)

root.render(<App />)