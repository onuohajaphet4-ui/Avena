import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './Photo.css'

const PhotoStep = () => {
  const navigate = useNavigate();

  const [photos, setPhotos] = useState([]); // real files
  const [previewPhotos, setPreviewPhotos] = useState([]); // preview urls
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // select photos
  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);

    if (photos.length + files.length > 6) {
      setError("Maximum 6 photos allowed");
      return;
    }

    const previews = files.map((file) => URL.createObjectURL(file));

    setPhotos((prev) => [...prev, ...files]);
    setPreviewPhotos((prev) => [...prev, ...previews]);
    setError("");
  };

  // remove photo
  const removePhoto = (index) => {
    const updatedFiles = photos.filter((_, i) => i !== index);
    const updatedPreviews = previewPhotos.filter((_, i) => i !== index);

    setPhotos(updatedFiles);
    setPreviewPhotos(updatedPreviews);
  };

  // submit profile
  const handleNext = async () => {
    if (photos.length < 2) {
      setError("Upload at least 2 photos");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("name", localStorage.getItem("avena_name"));
      formData.append("age", Number (localStorage.getItem("avena_age")));
      formData.append("gender", localStorage.getItem("avena_gender"));
      formData.append("phone", localStorage.getItem("avena_phone"));
      formData.append("bio", localStorage.getItem("avena_bio"));
      formData.append("prompt", localStorage.getItem("avena_prompt"));

      photos.forEach((photo) => {
        formData.append("photos", photo);
      });


      console.log(formData)

      const res = await axios.post(
        "http://localhost:3000/api/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      console.log(res.data);
      alert("Profile created successfully!");
      navigate("/looking");
    } catch (error) {
      console.log(error.response?.data);
      setError("Failed to create profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="photo-body">
    <div className="photo-register">

       
      <div className="pho">
      <div className="photo">
        <h1>Add your photos</h1>
        <h4>Upload at least 2 photos</h4>

        {error && <p>{error}</p>}

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoChange}
          className="photo-input"
        />

        <div className="photo-grid">
          {previewPhotos.map((photo, index) => (
            <div key={index} className="photo-box">
              <img src={photo} alt="preview" width="120" />
              <button
                type="photo-button"
                onClick={() => removePhoto(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <br />

        <button
          onClick={handleNext}
          className="photo-button"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Next"}
        </button>
      </div>
    </div>
    </div>
    </div>
  );
};

export default PhotoStep;