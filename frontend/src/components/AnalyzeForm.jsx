import { useState } from "react";

const AnalyzeForm = ({ onAnalyze }) => {
  const [claim, setClaim] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!claim.trim()) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claim: claim }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      onAnalyze(data);
    } catch (error) {
      console.error("Error analyzing claim:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📝 Enter a Claim</h2>
      <input
        type="text"
        placeholder="Type a claim to analyze..."
        value={claim}
        onChange={(e) => setClaim(e.target.value)}
        className="border p-3 w-full rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <button
        type="submit"
        className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded-lg"
      >
        Analyze Claim
      </button>
    </form>
  );
};

export default AnalyzeForm;
