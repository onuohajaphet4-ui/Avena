import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profileedit.css";
import { useNavigate,Link } from "react-router-dom";

export default function EditProfile() {

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    bio: "",
    prompt: "",
    photos: [],
    city: "",
    nationality: "",
    school: "",
    height: "",
    zodiac: "",
    introvertExtrovert: "",
    favoriteFood: "",
    dreamCountry: "",
    firstHangout: "",
    greenFlag: "",
    redFlag: "",
    musicTaste: [],
    movieTaste: []
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [newPhotos, setNewPhotos] = useState([]);

  const token = localStorage.getItem("token");

  // ================= GET PROFILE =================
  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const res = await axios.get(
        "https://avena-backend.onrender.com/api/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = res.data;

      setForm({
        ...data,
        age: data.age ? data.age.split("T")[0] : "",
        musicTaste: data.musicTaste || [],
        movieTaste: data.movieTaste || []
      });

      setPreviewPhotos(data.photos || []);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // ================= ARRAY INPUT =================
  const handleArrayChange = (e, field) => {
    setForm({
      ...form,
      [field]: e.target.value.split(",").map(i => i.trim())
    });
  };

  // ================= PHOTO SELECT =================
  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);

    setNewPhotos(files);

    const previews = files.map(file =>
      URL.createObjectURL(file)
    );

    setPreviewPhotos(prev => [...prev, ...previews]);
  };

  // ================= REMOVE PHOTO =================
  const removePhoto = (index) => {
    const updatedPreview = [...previewPhotos];
    updatedPreview.splice(index, 1);
    setPreviewPhotos(updatedPreview);

    const updatedPhotos = [...form.photos];
    updatedPhotos.splice(index, 1);

    setForm({
      ...form,
      photos: updatedPhotos
    });
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (key !== "photos") {
          if (Array.isArray(form[key])) {
            formData.append(key, JSON.stringify(form[key]));
          } else {
            formData.append(key, form[key]);
          }
        }
      });

      // new photos
      newPhotos.forEach((file) => {
        formData.append("photos", file);
      });

      await axios.put(
        "https://avena-backend.onrender.com/api/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );
      navigate("/profile");

      alert("Updated successfully 🔥");

    } catch (err) {
      console.log(err);
      alert("Error updating profile");
    }
  };

  const zodiacOptions = [
  { name: "Aries", emoji: "♈" },
  { name: "Taurus", emoji: "♉" },
  { name: "Gemini", emoji: "♊" },
  { name: "Cancer", emoji: "♋" },
  { name: "Leo", emoji: "♌" },
  { name: "Virgo", emoji: "♍" },
  { name: "Libra", emoji: "♎" },
  { name: "Scorpio", emoji: "♏" },
  { name: "Sagittarius", emoji: "♐" },
  { name: "Capricorn", emoji: "♑" },
  { name: "Aquarius", emoji: "♒" },
  { name: "Pisces", emoji: "♓" }
];

  if (loading) return <p>Loading...</p>;

  // ================= PROMPT PARSE =================
  let parsedPrompt = {};
  try {
    parsedPrompt = form.prompt
      ? JSON.parse(form.prompt)
      : {};
  } catch {
    parsedPrompt = {};
  }

  return (
    <div className="profile-body">
    <div className="edit-page">
      <div className="edit-int">
        <h2>Edit Profile</h2>
        <h2><Link to='/prefrenceedit'>Edit Prefrence</Link></h2>
      </div>

      <form onSubmit={handleSubmit}>

        {/* PHOTOS */}
        <section className="edit-card">
          <h3>Photos</h3>
<div className="photo-grid">
            {previewPhotos.map((img, i) => (
              <div key={i} className="photo-box">
                <img src={img} alt="" />
                <button type="button" onClick={() => removePhoto(i)}>
                  ✕
                </button>
              </div>
            ))}
          </div>

          <input type="file" multiple onChange={handlePhotoChange} />
        </section>

        {/* BASIC */}
        <section className="edit-card">
          <h3>Basic Info</h3>

          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />

          <input
            type="date"
            name="age"
            value={form.age}
            onChange={handleChange}
          />

          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />

          <input name="city" value={form.city} onChange={handleChange} placeholder="City" />
          <input name="nationality" value={form.nationality} onChange={handleChange} placeholder="Nationality" />
          <input name="school" value={form.school} onChange={handleChange} placeholder="School" />
        </section>

        {/* ABOUT */}
        <section className="edit-card">
          <h3>About</h3>

          <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Your bio..." />

          <input
            placeholder="Prompt Question"
            value={parsedPrompt.question || ""}
            onChange={(e) =>
              setForm({
                ...form,
                prompt: JSON.stringify({
                  ...parsedPrompt,
                  question: e.target.value
                })
              })
            }
          />

          <textarea
            placeholder="Prompt Answer"
            value={parsedPrompt.answer || ""}
            onChange={(e) =>
              setForm({
                ...form,
                prompt: JSON.stringify({
                  ...parsedPrompt,
                  answer: e.target.value
                })
              })
            }
          />

          <input name="height" value={form.height} onChange={handleChange} placeholder="Height" />
          <select
  value={form.zodiac}
  onChange={(e) =>
    setForm({ ...form, zodiac: e.target.value })
  }
>
  <option value="">Select your zodiac</option>

  {zodiacOptions.map((z, index) => (
    <option key={index} value={z.name}>
      {z.emoji} {z.name}
    </option>
  ))}
</select>

          <select
            name="socialType"
            value={form.socialType}
            onChange={handleChange}
          >
            <option value="">Social vibe</option>
            <option value="Introvert">Introvert</option>
            <option value="Extrovert">Extrovert</option>
            <option value="Ambivert">Ambivert</option>
          </select>
        </section>

        {/* FUN */}
        <section className="edit-card">
          <h3>Fun Side</h3>

          <input name="favoriteFood" value={form.favoriteFood} onChange={handleChange} placeholder="Favorite Food" />
          <input name="dreamCountry" value={form.dreamCountry} onChange={handleChange} placeholder="Dream Country" />
          <input name="firstHangout" value={form.firstHangout} onChange={handleChange} placeholder="First Hangout" />
          <input name="greenFlag" value={form.greenFlag} onChange={handleChange} placeholder="Green Flag" />
          <input name="redFlag" value={form.redFlag} onChange={handleChange} placeholder="Red Flag" />
        </section>

        {/* ENTERTAINMENT */}
        <section className="edit-card">
          <h3>Entertainment</h3>

          <input
            value={form.musicTaste.join(", ")}
            onChange={(e) => handleArrayChange(e, "musicTaste")}
            placeholder="Music taste"
          />
  <input
            value={form.movieTaste.join(", ")}
            onChange={(e) => handleArrayChange(e, "movieTaste")}
            placeholder="Movie taste"
          />
        </section>

        <button type="submit" className="save-btn">
          Save Changes
        </button>

      </form>
    </div>
    </div>
  );
}