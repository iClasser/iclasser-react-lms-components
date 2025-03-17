import React, { useState } from "react";

interface EditProps {
  imageUrl: string;
  onSave: (newImageUrl: string) => void;
}

const Edit: React.FC<EditProps> = ({ imageUrl, onSave }) => {
  const [newImageUrl, setNewImageUrl] = useState(imageUrl);

  const handleSave = () => {
    onSave(newImageUrl);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <input
        type="text"
        value={newImageUrl}
        onChange={(e) => setNewImageUrl(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter image URL"
      />
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save
      </button>
    </div>
  );
};

export default Edit;