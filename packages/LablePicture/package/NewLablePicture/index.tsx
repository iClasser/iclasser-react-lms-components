import styled, { keyframes } from 'styled-components';
import React, { useState, useRef } from 'react';
import styles from './style.module.css';

const Button: React.FC<{ isEditMode: boolean }> = ({ isEditMode }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for the file input

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImageUrl(e.target.result as string); // Set the image URL
        }
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  // Trigger file input dialog when the button is clicked
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programmatically click the file input
    }
  };

  return (
    <StyledWrapper>
      {/* File input (hidden) */}
      <input
        type="file"
        id="fileInput"
        accept="image/*" // Allow only image files
        onChange={handleFileChange}
        ref={fileInputRef} // Attach the ref
        style={{ display: 'none' }} // Hide the file input
      />

      {/* Image preview */}
      {imageUrl && (
        <ImageContainer isEditMode={isEditMode}>
          <img src={imageUrl} alt="Selected" className="preview-image" />
        </ImageContainer>
      )}

      {/* Button with stars animation */}
      {isEditMode && (
        <ButtonContainer>
          <StyledButton onClick={handleButtonClick}>
            {imageUrl ? 'Change Picture' : 'Add Picture'}
            <div className="star-1">
              <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" style={{ shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision', imageRendering: 'optimizeQuality', fillRule: 'evenodd', clipRule: 'evenodd' }} viewBox="0 0 784.11 815.53" xmlnsXlink="http://www.w3.org/1999/xlink">
                <defs />
                <g id="Layer_x0020_1">
                  <metadata id="CorelCorpID_0Corel-Layer" />
                  <path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
                </g>
              </svg>
            </div>
            <div className="star-2">
              <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" style={{ shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision', imageRendering: 'optimizeQuality', fillRule: 'evenodd', clipRule: 'evenodd' }} viewBox="0 0 784.11 815.53" xmlnsXlink="http://www.w3.org/1999/xlink">
                <defs />
                <g id="Layer_x0020_1">
                  <metadata id="CorelCorpID_0Corel-Layer" />
                  <path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
                </g>
              </svg>
            </div>
            <div className="star-3">
              <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" style={{ shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision', imageRendering: 'optimizeQuality', fillRule: 'evenodd', clipRule: 'evenodd' }} viewBox="0 0 784.11 815.53" xmlnsXlink="http://www.w3.org/1999/xlink">
                <defs />
                <g id="Layer_x0020_1">
                  <metadata id="CorelCorpID_0Corel-Layer" />
                  <path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
                </g>
              </svg>
            </div>
            <div className="star-4">
              <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" style={{ shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision', imageRendering: 'optimizeQuality', fillRule: 'evenodd', clipRule: 'evenodd' }} viewBox="0 0 784.11 815.53" xmlnsXlink="http://www.w3.org/1999/xlink">
                <defs />
                <g id="Layer_x0020_1">
                  <metadata id="CorelCorpID_0Corel-Layer" />
                  <path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
                </g>
              </svg>
            </div>
            <div className="star-5">
              <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" style={{ shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision', imageRendering: 'optimizeQuality', fillRule: 'evenodd', clipRule: 'evenodd' }} viewBox="0 0 784.11 815.53" xmlnsXlink="http://www.w3.org/1999/xlink">
                <defs />
                <g id="Layer_x0020_1">
                  <metadata id="CorelCorpID_0Corel-Layer" />
                  <path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
                </g>
              </svg>
            </div>
            <div className="star-6">
              <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" style={{ shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision', imageRendering: 'optimizeQuality', fillRule: 'evenodd', clipRule: 'evenodd' }} viewBox="0 0 784.11 815.53" xmlnsXlink="http://www.w3.org/1999/xlink">
                <defs />
                <g id="Layer_x0020_1">
                  <metadata id="CorelCorpID_0Corel-Layer" />
                  <path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
                </g>
              </svg>
            </div>
          </StyledButton>
        </ButtonContainer>
      )}

      {/* Preview Mode Message */}
      {!isEditMode && (
        <div className="text-center">
          <p className="text-gray-700"></p>
          {!imageUrl && (
            <p className="text-gray-500">No image selected yet.</p>
          )}
        </div>
      )}
    </StyledWrapper>
  );
};

// Keyframes for border animation
const borderAnimation = keyframes`
  0% {
    border-color: #007bff;
  }
  50% {
    border-color: #0056b3;
  }
  100% {
    border-color: #007bff;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f5f5f5;
`;

const ImageContainer = styled.div<{ isEditMode: boolean }>`
  margin-bottom: 20px;
  padding: 5px;
  border-radius: 1rem;
  overflow: visible;
  background: #74ebd5;
  background: linear-gradient(to right, #74ebd5 0%, #acb6e5 100%);
  position: relative;
  z-index: 1;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    z-index: -1;
  }

  &::before {
    background: linear-gradient(to bottom right, #f6d365 0%, #fda085 100%);
    transform: rotate(2deg);
  }

  &::after {
    background: linear-gradient(to top right, #84fab0 0%, #8fd3f4 100%);
    transform: rotate(-2deg);
  }

  .preview-image {
    width: ${({ isEditMode }) => (isEditMode ? '300px' : '500px')}; /* Larger in Preview Mode */
    height: auto;
    border-radius: 0.7rem;
    position: relative;
    z-index: 2;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px; /* Space between buttons */
`;

const StyledButton = styled.button`
  position: relative;
  padding: 12px 35px;
  background: #007bff; /* Blue color */
  font-size: 17px;
  font-weight: 500;
  color: #ffffff; /* White text */
  border: 3px solid #007bff;
  border-radius: 8px;
  box-shadow: 0 0 0 #007bff8c;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  .star-1 {
    position: absolute;
    top: 20%;
    left: 20%;
    width: 25px;
    height: auto;
    filter: drop-shadow(0 0 0 #007bff); /* Blue shadow */
    z-index: -5;
    transition: all 1s cubic-bezier(0.05, 0.83, 0.43, 0.96);
  }

  .star-2 {
    position: absolute;
    top: 45%;
    left: 45%;
    width: 15px;
    height: auto;
    filter: drop-shadow(0 0 0 #007bff); /* Blue shadow */
    z-index: -5;
    transition: all 1s cubic-bezier(0, 0.4, 0, 1.01);
  }

  .star-3 {
    position: absolute;
    top: 40%;
    left: 40%;
    width: 5px;
    height: auto;
    filter: drop-shadow(0 0 0 #007bff); /* Blue shadow */
    z-index: -5;
    transition: all 1s cubic-bezier(0, 0.4, 0, 1.01);
  }

  .star-4 {
    position: absolute;
    top: 20%;
    left: 40%;
    width: 8px;
    height: auto;
    filter: drop-shadow(0 0 0 #007bff); /* Blue shadow */
    z-index: -5;
    transition: all 0.8s cubic-bezier(0, 0.4, 0, 1.01);
  }

  .star-5 {
    position: absolute;
    top: 25%;
    left: 45%;
    width: 15px;
    height: auto;
    filter: drop-shadow(0 0 0 #007bff); /* Blue shadow */
    z-index: -5;
    transition: all 0.6s cubic-bezier(0, 0.4, 0, 1.01);
  }

  .star-6 {
    position: absolute;
    top: 5%;
    left: 50%;
    width: 5px;
    height: auto;
    filter: drop-shadow(0 0 0 #007bff); /* Blue shadow */
    z-index: -5;
    transition: all 0.8s ease;
  }

  &:hover {
    background: transparent;
    color: #007bff; /* Blue text on hover */
    box-shadow: 0 0 25px #007bff8c;
  }

  &:hover .star-1 {
    position: absolute;
    top: -80%;
    left: -30%;
    width: 25px;
    height: auto;
    filter: drop-shadow(0 0 10px #007bff); /* Blue shadow */
    z-index: 2;
  }

  &:hover .star-2 {
    position: absolute;
    top: -25%;
    left: 10%;
    width: 15px;
    height: auto;
    filter: drop-shadow(0 0 10px #007bff); /* Blue shadow */
    z-index: 2;
  }

  &:hover .star-3 {
    position: absolute;
    top: 55%;
    left: 25%;
    width: 5px;
    height: auto;
    filter: drop-shadow(0 0 10px #007bff); /* Blue shadow */
    z-index: 2;
  }

  &:hover .star-4 {
    position: absolute;
    top: 30%;
    left: 80%;
    width: 8px;
    height: auto;
    filter: drop-shadow(0 0 10px #007bff); /* Blue shadow */
    z-index: 2;
  }

  &:hover .star-5 {
    position: absolute;
    top: 25%;
    left: 115%;
    width: 15px;
    height: auto;
    filter: drop-shadow(0 0 10px #007bff); /* Blue shadow */
    z-index: 2;
  }

  &:hover .star-6 {
    position: absolute;
    top: 5%;
    left: 60%;
    width: 5px;
    height: auto;
    filter: drop-shadow(0 0 10px #007bff); /* Blue shadow */
    z-index: 2;
  }

  .fil0 {
    fill: #007bff; /* Blue color for stars */
  }
`;

export default Button;