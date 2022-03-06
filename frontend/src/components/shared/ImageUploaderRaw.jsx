import axios from 'axios';
import { useState } from 'react';

export default function ImageUploaderRaw() {
  const [fileInputState, setFileInputState] = useState([]);

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    handleFileConvertion(files);
  };

  const handleFileConvertion = (files) => {
    [...files].forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFileInputState((prevState) => [...prevState, reader.result]);
      };
    });
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (fileInputState.length <= 0) return;
    uploadImage(fileInputState);
  };

  const uploadImage = async (imagesArray) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/v1/auth/upload',
        JSON.stringify({ data: imagesArray[0] }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Upload</h1>
      <form onSubmit={handleSubmitFile}>
        <input type='file' onChange={handleFileInputChange} multiple />
        <button type='submit'>Upload</button>
      </form>

      <div>
        {fileInputState.length > 0 &&
          fileInputState.map((file, id) => (
            <img className='block w-[300px] h-[400px] object-cover' key={id} src={file} alt='preview' />
          ))}
      </div>
    </div>
  );
}
