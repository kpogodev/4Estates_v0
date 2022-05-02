import React from 'react'
import Blocks from 'editorjs-blocks-react-renderer'

function DisplayRichText({ blocks, className }) {
  return (
    <div className={`${className} ${typography}`}>
      <Blocks data={blocks} />
    </div>
  )
}

const typography = 'prose prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-h5:text-lg prose-h6:text-base'

export default DisplayRichText
