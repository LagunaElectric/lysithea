import { useState, useEffect, useRef } from "react"
import { useActions } from "../hooks/use-actions"
import MDEditor from "@uiw/react-md-editor"
import { Cell } from "../state"
import './text-editor.css'

interface TextEditorProps {
  cell: Cell
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(false)
  const editorRef = useRef<HTMLDivElement | null>(null)
  const { updateCell } = useActions()

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        event.target &&
        event.target instanceof HTMLElement &&
        editorRef.current &&
        editorRef.current.contains(event.target)
      ) {
        return
      }

      setEditing(false)
    }

    document.addEventListener('click', listener, { capture: true })

    return () => {
      document.removeEventListener('click', listener, { capture: true })
    }
  }, [])

  if (editing) {
    return (
      <div ref={ editorRef } className='text-editor'>
        <MDEditor value={ cell.content } onChange={ (val) => updateCell(cell.id, val || '') } />
      </div>
    )
  }

  return (
    <div onClick={ () => setEditing(true) } className='text-editor card'>
      <div className="card-content"><MDEditor.Markdown source={ cell.content || '# Click to edit' } /></div>
    </div>
  )
}

export default TextEditor