const FactCheckResults = ({ result }) => {
  if (!result) return null;

  return (
    <div className="max-w-2xl mx-auto mt-6 bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Analysis Result</h3>
      <p className="text-gray-700">
        <span className="font-bold text-blue-600">Claim:</span> {result.claim}
      </p>
      <p className="text-gray-600">
        <span className="font-bold text-red-500">Result:</span> {result.label}
      </p>
      <p className="text-gray-500">
        <span className="font-bold">Probability:</span> {result.misinformation_probability}
      </p>
    </div>
  );
};

export default FactCheckResults;
