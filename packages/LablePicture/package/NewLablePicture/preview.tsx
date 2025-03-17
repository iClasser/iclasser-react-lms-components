import React from 'react';
import styles from './style.module.css';

interface PreviewProps {
  imageUrl: string;
  onClose: () => void; // Function to close the preview
}

const Preview: React.FC<PreviewProps> = ({ imageUrl, onClose }) => {
  return (
    <div className={styles.previewOverlay}>
      <div className={styles.previewContent}>
        <img src={imageUrl} alt="Preview" className={styles.previewImage} />
        <button onClick={onClose} className={styles.closeButton}>
          Edit Mode
        </button>
      </div>
    </div>
  );
};

export default Preview;