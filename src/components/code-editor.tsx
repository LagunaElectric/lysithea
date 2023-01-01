import { useRef } from 'react'
import prettier from 'prettier'
import parser from 'prettier/parser-babel'
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react'

interface CodeEditorProps {
  initialValue: string
  onChange(value: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>()

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue())
    })
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 })
  }

  const onFormatClick = () => {
    const unformatted = editorRef.current.getModel().getValue()
    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: false,
      singleQuote: true
    })

    editorRef.current.setValue(formatted)
  }

  return (
    <>
      <button onClick={ onFormatClick }>Format</button>
      <MonacoEditor
        editorDidMount={ onEditorDidMount }
        value={ initialValue }
        theme="vs-dark"
        language="javascript"
        height="500px"
        options={
          {
            wordWrap: 'on',
            minimap: { enabled: false },
            showUnused: false,
            folding: false,
            lineNumbersMinChars: 3,
            fontSize: 16,
            scrollBeyondLastLine: false,
            automaticLayout: true
          }
        }
      />
    </>
  )
}

export default CodeEditor