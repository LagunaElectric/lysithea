import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
// import { store } from './state'
import CellList from './components/cell-list'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { store } from './redux/store'
import './index.css'

const App = () => {
  return (
    <Provider store={ store }>
      <div className='bg-slate-600'>
        <CellList />
      </div>
    </Provider>
  )
}

const root = createRoot(document.getElementById('root')!)

root.render(<App />)