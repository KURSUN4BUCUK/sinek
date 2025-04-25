import { useState } from "react";
import WaitingScreen from "./WaitingScreen";
import ContextPage from "./ContextPage";
import MemeSelectPage from "./MemeSelectPage";
import MemeVotePage from "./MemeVotePage";
import ResultPage from "../ResultPage";

function GameInterface({ participants, user, gameState, context, memes, votes, handleContextSubmit, handleMemeSubmit, handleVoteSubmit, currentTurn }) {


  const calculateResults = () => {
    const scores = {};
    Object.values(votes).forEach((vote) => {
      scores[vote] = (scores[vote] || 0) + 1;
    });
    return participants.map((p) => ({
      ...p,
      score: scores[p.id] || 0,
    })).sort((a, b) => b.score - a.score);
  };

  if (gameState === "context") {
    const currentUser = participants[currentTurn];
    return currentUser.name === user.name ? (
      <ContextPage
        onSubmit={(newContext) => {
          handleContextSubmit(newContext);
        }}
      />
    ) : (
      <WaitingScreen message={`${currentUser.name} is setting the context...`} />
    );
  }

  if (gameState === "memeSelect") {
    return (
      <MemeSelectPage
        context={context}
        onSubmit={(memeUrl) => handleMemeSubmit(user.name, memeUrl)}
        submitted={!!memes[user.name]}
      />
    );
  }

  if (gameState === "vote") {
    return (
      <MemeVotePage
        memes={Object.entries(memes).filter(([name]) => name !== user.name)}
        onSubmit={(votedFor) => handleVoteSubmit(user.name, votedFor)}
        submitted={!!votes[user.name]}
      />
    );
  }

  if (gameState === "result") {
    return <ResultPage results={calculateResults()} />;
  }

  return null;
}

export default GameInterface;