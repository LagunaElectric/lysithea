import { ResizableBox } from "react-resizable"
import './resizable.css'

interface ResizableProps {
  direction: 'horizontal' | 'vertical',
  children?: React.ReactNode
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox
      width={ Infinity }
      height={ 300 }
      resizeHandles={ ['s'] }
      maxConstraints={ [Infinity, window.innerHeight * 0.9] }
    >
      { children }
    </ResizableBox>
  )
}

export default Resizable