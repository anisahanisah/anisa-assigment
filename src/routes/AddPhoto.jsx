import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const addPhoto = async (e) => {
    e.preventDefault();

    const photo = {
      imageUrl,
      captions,
      createdAt: new Date(),
      updatedAt: new Date(),
      secret: "password",
    };
    if (secret === "password") {
      let url="https://gallery-app-server.vercel.app/photos"
      await fetch(url , {
        method: "POST",
        body: JSON.stringify(photo),
        headers: {
          "Content-Type": "application/json",
        },
      })
      navigate("/photos");
    }else if (secret != "password") {
      setError("You are not authorized");
    }
  };

  return (
    <>
      <div className="container">
      {error && <div className="error-msg">{error}</div>}
        <form className="add-form"  onSubmit={addPhoto}>
          <label>
            Image Url:
            <input
              className="add-input"
              type="text"
              data-testid="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
          <label>
            Captions:
            <input
              className="add-input"
              type="text"
              data-testid="captions"
              value={captions}
              onChange={(e) => setCaptions(e.target.value)}
            />
          </label>
          <label>
            Secret:
            <input
              className="add-input"
              type="text"
              value={secret}
              data-testid="secret"
              onChange={(e) => setSecret(e.target.value)}
            />
          </label>
          <input className="submit-btn" type="submit" value="Submit" data-testid="submit" />
        </form>
      </div>
    </>
  );
};

export default AddPhoto;
