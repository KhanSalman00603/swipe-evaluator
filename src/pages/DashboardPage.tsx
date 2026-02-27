import { motion } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import PageContainer from "@/components/PageContainer";
import { GraduationCap, Bot, ShieldCheck, Activity, ArrowRight } from "lucide-react";

const cards = [
  { key: "academic", icon: GraduationCap, label: "Academic Score", field: "academicScore" as const, suffix: "%", color: "text-primary" },
  { key: "ai", icon: Bot, label: "AI Likelihood", field: "aiLikelihood" as const, suffix: "%", color: "text-success" },
  { key: "confidence", icon: ShieldCheck, label: "Confidence", field: "confidenceScore" as const, suffix: "%", color: "text-primary" },
  { key: "behavior", icon: Activity, label: "Behavior", field: "behaviorStatus" as const, suffix: "", color: "text-success" },
];

const DashboardPage = () => {
  const { state, goToNextPage } = useAppContext();
  const { evaluation } = state;

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl"
      >
        <h2 className="text-3xl font-bold mb-2">Evaluation Dashboard</h2>
        <p className="text-muted-foreground mb-8">Summary of AI analysis results</p>

        <div className="grid sm:grid-cols-2 gap-5">
          {cards.map(({ key, icon: Icon, label, field, suffix, color }, i) => {
            const val = evaluation[field];
            const display = typeof val === "number" ? `${val}${suffix}` : String(val);
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="p-6 rounded-2xl glass gradient-border"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <span className="text-sm text-muted-foreground">{label}</span>
                </div>
                <p className="text-3xl font-bold capitalize">{display}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center mt-8">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={goToNextPage}
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold"
          >
            View Full Report
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </PageContainer>
  );
};

export default DashboardPage;
