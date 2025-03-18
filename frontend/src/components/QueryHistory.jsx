import { useEffect, useState } from "react";

const QueryHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/history")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched history:", data); // Debugging: Log data to console
        setHistory(data.history || []);
      })
      .catch((error) => console.error("Error fetching history:", error));
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">🔍 Past Queries</h3>
      {history.length === 0 ? (
        <p className="text-gray-500 text-center">No queries yet.</p>
      ) : (
        <ul className="divide-y divide-gray-300">
          {history.map((query, index) => (
            <li key={index} className="py-3">
              <p className="text-gray-700">
                <span className="font-bold text-blue-600">Claim:</span> {query.claim}
              </p>
              <p className="text-gray-600">
                <span className="font-bold text-red-500">Result:</span> {query.result}
              </p>
              <p className="text-gray-500">
                <span className="font-bold">Probability:</span> {query.misinformation_probability}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QueryHistory;
