import { useRef, useCallback } from 'react'
import { createReactEditorJS } from 'react-editor-js'
import FontSize from 'editorjs-inline-font-size-tool'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import Paragraph from '@editorjs/paragraph'
import Underline from '@editorjs/underline'

function RichTextEditor({ className }) {
  const ReactEditorJS = createReactEditorJS()

  const tools = {
    underline: Underline,
    fontSize: FontSize,
    header: {
      class: Header,
      inlineToolbar: ['bold', 'italic', 'underline', 'fontSize'],
      config: {
        placeholder: 'Header',
        levels: [2, 3, 4, 5, 6],
        defaultLevel: 2,
      },
    },
    list: {
      class: List,
      inlineToolbar: ['bold', 'italic', 'underline', 'fontSize'],
      config: {
        placeholder: 'List',
      },
    },
    paragraph: {
      class: Paragraph,
      inlineToolbar: ['bold', 'italic', 'underline', 'fontSize'],
      config: {
        placeholder: 'Paragraph',
      },
    },
  }

  const editorCore = useRef(null)

  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance
  }, [])

  const handleSave = useCallback(async () => {
    const savedData = await editorCore.current.save()
  }, [])

  return (
    <div className={className}>
      <>
        <ReactEditorJS tools={tools} onInitialize={handleInitialize} />
        <button className='btn btn-primary' onClick={handleSave}>
          Send
        </button>
      </>
    </div>
  )
}

RichTextEditor.defaultProps = {
  className: '',
}

export default RichTextEditor
