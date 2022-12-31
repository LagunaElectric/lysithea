import MonacoEditor from '@monaco-editor/react'

const CodeEditor: React.FC = () => {
  return (
    <MonacoEditor
      theme="vs-dark"
      language="javascript"
      height="500px"
    />
  )
}

export default CodeEditor