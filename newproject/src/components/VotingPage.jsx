import React, { useState } from "react";

const candidatesData = [
  { id: 1, name: "Vennila Thayumanavan(NTK)", symbol:"symntk.jfif", image: "ntk.jfif" },
  { id: 2, name: "M. K. Stalin (DMK)", symbol: "symdmk.jfif", image: "dmk.jfif" },
  { id: 3, name: "Edappadi K (AIADMK)", symbol: "symaiadmk.jfif", image: "aiadmk.jfif" },
  { id: 4, name: "K. Annamalai (BJP)", symbol: "symbjp.jfif", image: "bjp.jfif" },
  { id: 5, name: "Vijay (TVK)", symbol: "symtvk.png", image: "tvk.jfif" },
  { id: 6, name: "Kamal Haasan (MNM)", symbol: "symmnm.png", image: "mnm.jfif" },
];

export default function VotingPage() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  
  const [votes, setVotes] = useState(() => {
  const initialVotes = {};
  candidatesData.forEach((c) => (initialVotes[c.id] = 0));
  return initialVotes;
});
    
  const handleVote = (id) => {
    if (hasVoted) return;

    const updatedVotes = {
      ...votes,
      [id]: (votes[id] || 0) + 1,
    };

    setVotes(updatedVotes);
    setSelectedCandidate(id);
    setHasVoted(true);
  };

  return (
    <>
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Vote Your Candidate</h1>

      
      <div className="flex flex-col gap-6 w-400 ">
        {candidatesData.map((candidate) => (
          <div
            key={candidate.id}
            className={`bg-white p-4 rounded-2xl shadow-lg text-center flex items-center justify-between ${
              selectedCandidate === candidate.id
                ? "border-4 border-green-500"
                : ""
            }`}
          >
            
            <img
              src={candidate.image}
              alt={candidate.name}
              className="w-45 h-45 mx-5 rounded-3xl mb-4 items-center"
            />

            <h2 className="text-xl font-semibold">{candidate.name}</h2>
           <img
              src={candidate.symbol}
              alt={candidate.name}
              className="w-45 h-45 mx-5 rounded-3xl mb-4 items-center"
            />
            
            <p className="text-lg font-bold mb-2">
              Votes: {votes[candidate.id] || 0}
            </p>

            <input
              type="checkbox"
              checked={selectedCandidate === candidate.id}
              onChange={() => handleVote(candidate.id)}
              disabled={hasVoted}
              className="w-6 h-6"
            />

            <button
              onClick={() => handleVote(candidate.id)}
              disabled={hasVoted}
              className={`mt-3 px-4 py-2 rounded-lg text-white ${
                hasVoted
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Vote
            </button>
          </div>
        ))}
      </div>

      {hasVoted && (
        <p className="mt-6 text-green-600 font-semibold">
          ✅ You have voted!
        </p>
      )}
    </div>
    </>
  );
}