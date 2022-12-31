import MonacoEditor from '@monaco-editor/react'

const CodeEditor: React.FC = () => {
  return (
    <MonacoEditor
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
          automaticLayout: true,
        }
      }
    />
  )
}

export default CodeEditor