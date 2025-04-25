function MemeVotePage({ memes, onSubmit, submitted }) {
    const handleVote = (id) => {
      onSubmit(id);
    };
    console.log(memes);
  
    return (
      <div className="meme-vote-page">
        <h2>Vote for the Best Meme</h2>
        {submitted ? (
          <p>Waiting for others to vote...</p>
        ) : (
          <div className="meme-list">
            {memes.map(([id, url]) => (
              <div key={id} className="meme-item">
                <img src={url} alt="Meme" />
                <button onClick={() => handleVote(id)}>Vote</button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  export default MemeVotePage;