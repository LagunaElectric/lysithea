import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './state'
import CellList from './components/cell-list'
import 'bulmaswatch/superhero/bulmaswatch.min.css'

const App = () => {
  return (
    <Provider store={ store }>
      <div>
        <CellList />
      </div>
    </Provider>
  )
}

const root = createRoot(document.getElementById('root')!)

root.render(<App />)