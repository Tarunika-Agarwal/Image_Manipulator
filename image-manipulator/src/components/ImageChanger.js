// src/components/ImageChanger.js
import React, { useCallback, useEffect, useState } from 'react';
import Resizer from 'react-image-file-resizer';
import './ImageChanger.css'; // Import CSS file

const unitsToPixels = (valueInCm) => {
  const dpi = 96; // Standard DPI (dots per inch)
  const cmToInches = 2.54;
  return (valueInCm / cmToInches) * dpi;
};

const ImageChanger = ({ imageFile }) => {
  const [widthCm, setWidthCm] = useState(30); // Default width in cm
  const [heightCm, setHeightCm] = useState(30); // Default height in cm
  const [maxSizeKB, setMaxSizeKB] = useState(500); // Max size in KB
  const [imageDataUrl, setImageDataUrl] = useState(null);

  const resizeFile = useCallback(
    (file) =>
      new Promise((resolve) => {
        const widthPx = unitsToPixels(widthCm);
        const heightPx = unitsToPixels(heightCm);

        Resizer.imageFileResizer(
          file,
          widthPx,
          heightPx,
          'JPEG', // Use JPEG format
          100, // Maximum quality to retain as much detail as possible
          0, // No additional compression
          (uri) => {
            resolve(uri);
          },
          'base64'
        );
      }),
    [widthCm, heightCm]
  );

  useEffect(() => {
    if (imageFile) {
      resizeFile(imageFile).then(setImageDataUrl);
    }
  }, [imageFile, resizeFile]);

  const handleResize = async () => {
    const resizedImage = await resizeFile(imageFile);

    // Convert the resized image to Blob to check its size
    const blob = await fetch(resizedImage).then((res) => res.blob());
    const fileSizeKB = blob.size / 1024;

    if (fileSizeKB <= maxSizeKB) {
      setImageDataUrl(resizedImage);
    } else {
      alert(`The resized image exceeds the maximum size of ${maxSizeKB} KB.`);
    }
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = imageDataUrl;
    link.download = 'resized-image.jpg';
    link.click();
  };

  return (
    <div className="image-changer-container">
      <div>
        <label>Width (cm): </label>
        <input
          type="number"
          value={widthCm}
          onChange={(e) => setWidthCm(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Height (cm): </label>
        <input
          type="number"
          value={heightCm}
          onChange={(e) => setHeightCm(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Max Size (KB): </label>
        <input
          type="number"
          value={maxSizeKB}
          onChange={(e) => setMaxSizeKB(parseFloat(e.target.value))}
        />
      </div>
      <button onClick={handleResize}>Resize Image</button>
      {imageDataUrl && (
        <div className="image-preview-container">
          <img src={imageDataUrl} alt="Resized" className="image-preview" />
          <button onClick={downloadImage} className="download-button">Download Resized Image</button>
        </div>
      )}
    </div>
  );
};

export default ImageChanger;
