// src/App.js
import React, { useState } from 'react';
import './App.css';
import ImageChanger from './components/ImageChanger';
import ImageUpload from './components/ImageUpload';

function App() {
  const [imageFile, setImageFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setImageFile(acceptedFiles[0]);
    }
  };

  return (
    <div className="App">
      <h1>Image Manipulator</h1>
      <ImageUpload onDrop={onDrop} />
      {imageFile && <ImageChanger imageFile={imageFile} />}

     <div> <footer className="footer">
        <p>&copy; {new Date().getFullYear()} | Specifically designed for user-friendly form filling</p>
      </footer></div>
    </div>

  );
}

export default App;
