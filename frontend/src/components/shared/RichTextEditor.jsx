import { useRef, useCallback, useEffect } from 'react'
import { createReactEditorJS } from 'react-editor-js'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import Paragraph from '@editorjs/paragraph'
import Underline from '@editorjs/underline'

function RichTextEditor({ className, initialData, stateName, onChange }) {
  const ReactEditorJS = createReactEditorJS()

  const tools = {
    underline: Underline,
    header: {
      class: Header,
      inlineToolbar: ['bold', 'italic', 'underline'],
      config: {
        placeholder: 'Header',
        levels: [2, 3, 4, 5, 6],
        defaultLevel: 3,
      },
    },
    list: {
      class: List,
      inlineToolbar: ['bold', 'italic', 'underline'],
      config: {
        placeholder: 'List',
      },
    },
    paragraph: {
      class: Paragraph,
      inlineToolbar: ['bold', 'italic', 'underline'],
      config: {
        placeholder: 'Here you can type your paragraph...',
      },
    },
  }

  const editorCore = useRef(null)

  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance
  }, [])

  const handleSave = useCallback(async () => {
    const savedData = await editorCore.current.save()
    onChange(stateName, savedData)
  }, [onChange, stateName])

  useEffect(() => {
    return () => {
      handleSave()
    }
  }, [handleSave])

  return (
    <div className={className}>
      <div className='flex flex-col w-full gap-5'>
        <ReactEditorJS tools={tools} onInitialize={handleInitialize} defaultValue={initialData} />
      </div>
    </div>
  )
}

RichTextEditor.defaultProps = {
  className: '',
}

export default RichTextEditor
