import { useState } from "react";

function MemeSelectPage({ context, onSubmit, submitted }) {
  const [memeUrl, setMemeUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (memeUrl.trim()) {
      onSubmit(memeUrl);
    }
  };

  return (
    <div className="meme-select-page">
      <h2>Find a Meme for: {context}</h2>
      {submitted ? (
        <p>Waiting for others to submit...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="url"
            placeholder="Paste meme URL..."
            value={memeUrl}
            onChange={(e) => setMemeUrl(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default MemeSelectPage;