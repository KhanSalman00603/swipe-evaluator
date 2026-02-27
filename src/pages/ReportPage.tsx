import { motion } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import PageContainer from "@/components/PageContainer";
import { FileText, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

const ReportPage = () => {
  const { state } = useAppContext();
  const { evaluation, submission } = state;

  const statusIcon = evaluation.flaggedStatus ? (
    <XCircle className="w-6 h-6 text-destructive" />
  ) : (
    <CheckCircle className="w-6 h-6 text-success" />
  );

  const rows = [
    { label: "Academic Score", value: `${evaluation.academicScore}%` },
    { label: "AI Likelihood", value: `${evaluation.aiLikelihood}%` },
    { label: "Confidence Score", value: `${evaluation.confidenceScore}%` },
    { label: "Behavior Status", value: evaluation.behaviorStatus },
    { label: "Emotion State", value: evaluation.emotionState },
    { label: "Cheating Warnings", value: evaluation.cheatingWarnings.length === 0 ? "None" : evaluation.cheatingWarnings.join(", ") },
  ];

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl"
      >
        <div className="flex items-center gap-3 mb-8">
          <FileText className="w-7 h-7 text-primary" />
          <h2 className="text-3xl font-bold">Instructor Report</h2>
        </div>

        <div className="rounded-2xl glass gradient-border overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Final Result</p>
              <p className="text-xl font-bold mt-1">{evaluation.finalResult}</p>
            </div>
            <div className="flex items-center gap-2">
              {statusIcon}
              <span className={`text-sm font-medium ${evaluation.flaggedStatus ? "text-destructive" : "text-success"}`}>
                {evaluation.flaggedStatus ? "Flagged" : "Clear"}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="divide-y divide-border">
            {rows.map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between px-6 py-4">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm font-medium capitalize">{value}</span>
              </div>
            ))}
          </div>

          {/* Submission preview */}
          {submission.text && (
            <div className="p-6 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">Submission Preview</p>
              <p className="text-sm text-secondary-foreground line-clamp-3 font-mono">
                {submission.text}
              </p>
            </div>
          )}
        </div>

        {evaluation.cheatingWarnings.length > 0 && (
          <div className="mt-4 p-4 rounded-xl bg-warning/10 border border-warning/20 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
            <div>
              <p className="text-sm font-medium text-warning">Warnings Detected</p>
              <p className="text-xs text-muted-foreground mt-1">
                {evaluation.cheatingWarnings.join("; ")}
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </PageContainer>
  );
};

export default ReportPage;
