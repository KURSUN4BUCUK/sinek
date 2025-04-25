import { useState } from "react";

function ContextPage({ onSubmit }) {
  const [context, setContext] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (context.trim()) {
      onSubmit(context);
    }
  };

  return (
    <div className="context-page">
      <h2>Set the Context</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a context..."
          value={context}
          onChange={(e) => setContext(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ContextPage;