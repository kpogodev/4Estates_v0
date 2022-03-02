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
        '/api/v1/image-uploader',
        JSON.stringify({ data: imagesArray, id: '621ef5ada41dfa58c3dbd509' }),
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

      <div style={styles}>
        {fileInputState.length > 0 && fileInputState.map((file, id) => <img key={id} src={file} alt='preview' />)}
      </div>
    </div>
  );
}

const styles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))',
  gap: '3rem',
  width: '100%',
  maxWidth: '1366px',
  margin: '0 auto',
  padding: '2rem',
};
