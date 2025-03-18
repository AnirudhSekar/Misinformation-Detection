import { useState } from "react";
import AnalyzeForm from "./components/AnalyzeForm";
import FactCheckResults from "./components/FactCheckResults";
import QueryHistory from "./components/QueryHistory";

const App = () => {
  const [analysisResult, setAnalysisResult] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          📰 Misinformation Detector
        </h1>
      </div>

      <AnalyzeForm onAnalyze={setAnalysisResult} />
      <FactCheckResults result={analysisResult} />
      <QueryHistory />
    </div>
  );
};

export default App;
