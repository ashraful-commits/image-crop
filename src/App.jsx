import React, { useState } from 'react'
import './App.css'
import ReactCrop from "react-image-crop"
import 'react-image-crop/dist/ReactCrop.css'

function App() {
  const [file, setFile] = useState(null)
  const [image, setImage] = useState(null)
  const [crop, setCrop] = useState({ aspect: 1 / 1, unit: "%", width: 50, height: 50, x: 25, y: 25 })
  const [croppedImage, setCroppedImage] = useState(null)
  const handleImageLoaded = (e) => {
    const img = e.target;
    setImage(img);
  }

  const handleCropChange = (newCrop) => {
    setCrop(newCrop)
  }

  const handleImag = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]))
  }

  const handleCropComplete = (crop) => {
    if (image && crop.width && crop.height) {
      getCroppedImg(image, crop, 'profile.jpeg')
    }
  }

  const getCroppedImg = () => {
    if (image && crop) {
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
  
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext('2d');
  
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
  
      canvas.toBlob((blob) => {
        if (blob) {
          // Convert blob to Base64 data URL with the desired image format
          const format = 'image/png'; // Change this to the desired format (e.g., 'image/png')
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            // Update state with the cropped image in Base64 format
            setCroppedImage(reader.result);
          };
        }
      }, 'image/png'); // Change the format here too if needed
    }
  }

  const handleCropButtonClick = () => {
    getCroppedImg()
  }

  return (
    <div>
      <input type="file" accept='image/*' onChange={handleImag} />
      {file && <ReactCrop
      
        crop={crop}
        onChange={handleCropChange}
        onComplete={handleCropComplete}
      >
        <img  onLoad={handleImageLoaded} style={{width:"200px",height:"200px"}} src={file} />
      </ReactCrop>}
      <button onClick={handleCropButtonClick}>Crop</button>
      {croppedImage && <img src={croppedImage} alt="Cropped" />}
    </div>
  )
}

export default App
