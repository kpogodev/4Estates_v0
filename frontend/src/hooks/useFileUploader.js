import e from 'cors'
import { useState, useCallback } from 'react'

const useFileUplaoder = ({ onSubmit = () => {} }) => {
  const [files, setFiles] = useState([])

  const handleChange = useCallback((e) => {
    Array.from(e.target.files).forEach((file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        setFiles((prevState) => [...prevState, reader.result])
      }
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(files)
    setFiles([])
  }

  return { files, handleChange, handleSubmit }
}

export default useFileUplaoder
