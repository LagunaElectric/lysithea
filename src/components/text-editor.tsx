import MDEditor from "@uiw/react-md-editor"
import { useState, useEffect, useRef } from "react"
import './text-editor.css'

const TextEditor: React.FC = () => {
  const [editing, setEditing] = useState(false)
  const editorRef = useRef<HTMLDivElement | null>(null)

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
        <MDEditor />
      </div>
    )
  }

  return (
    <div onClick={ () => setEditing(true) } className='text-editor'>
      <MDEditor.Markdown source="# this is the best" />
    </div>
  )
}

export default TextEditor