import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ScoreCard = ({ label, score, tagline}) => {
  const getProgressColor = (score) => {
    if (score >= 8) return "#22c55e";
    if (score >= 6) return "#f59e0b";
    return "#ef4444";
  };

  const getCardBg = (score) => {
    if (score >= 8) return "bg-green-50 border-green-200";
    if (score >= 6) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  return (
    <div
      className={`flex flex-col items-center p-4 rounded-xl bg-gray-50 shadow-sm`}
    >
      <div className="w-32 h-32 mb-4">
        <CircularProgressbar
          value={score}
          maxValue={10}
          text={`${score}/10`}
          styles={buildStyles({
            textSize: "22px",
            pathColor: getProgressColor(score),
            textColor: "#1F2937",
            trailColor: "#E5E7EB",
          })}
        />
      </div>

      <h3 className="font-bold text-gray-800 mb-1">{label}</h3>
      <p className="text-xs text-gray-600 text-center">
       {tagline}
      </p>
    </div>
  );
};

export default ScoreCard;
