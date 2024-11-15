import React, { useState } from "react";

const QuoteCreate = () => {
  const [text, setText] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleImageUpload = async (event) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    try {
      const response = await fetch(
        "https://crafto.app/crafto/v1.0/media/assignment/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setImageUrl(data.mediaUrl);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Image upload failed:", err);
    }
  };

  const handleCreateQuote = async () => {
    try {
      const response = await fetch(
        "https://assignment.stage.crafto.app/postQuote",
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text, mediaUrl: imageUrl }),
        }
      );

      if (response.ok) {
        alert("Quote created successfully!");
      } else {
        alert("Failed to create quote");
      }
    } catch (err) {
      console.error("Error creating quote:", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create a New Quote</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Quote Text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 mt-1 border rounded-lg"
          rows="4"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Upload Image
        </label>
        <input
          type="file"
          onChange={handleImageUpload}
          className="w-full p-2 mt-1 border rounded-lg"
        />
      </div>
      {loading && <p>Uploading image...</p>}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded"
          className="w-full h-48 object-cover mt-4 rounded-md"
        />
      )}
      <button
        onClick={handleCreateQuote}
        className="mt-4 bg-blue-500 text-white p-2 rounded-lg"
      >
        Create Quote
      </button>
    </div>
  );
};

export default QuoteCreate;
