// src/components/ImageUpload.js
import React from 'react';
import { useDropzone } from 'react-dropzone';
import './ImageUpload.css'; // Add some basic styling

const ImageUpload = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*'
  });

  return (
    <div {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop an image here, or click to select an image</p>
    </div>
  );
};

export default ImageUpload;
