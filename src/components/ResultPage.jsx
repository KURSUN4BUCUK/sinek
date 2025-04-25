function ResultPage({ results }) {
  console.log(results)
    return (
      <div className="result-page">
        <h2>Game Results</h2>
        <ul>
          {results.map((participant, index) => (
            <li key={participant.id}>
              {index + 1}. {participant.name} - {participant.score} points
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default ResultPage;