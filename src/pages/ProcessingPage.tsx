import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import PageContainer from "@/components/PageContainer";
import { Brain } from "lucide-react";

const ProcessingPage = () => {
  const { goToNextPage } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(goToNextPage, 4000);
    return () => clearTimeout(timer);
  }, [goToNextPage]);

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center"
      >
        {/* Animated loader */}
        <div className="relative mb-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="w-24 h-24 rounded-full border-2 border-primary/20 border-t-primary"
          />
          <Brain className="w-10 h-10 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>

        <h2 className="text-3xl font-bold mb-3">Analyzing</h2>
        <p className="text-muted-foreground max-w-sm">
          Evaluating submission content and behavioral patterns…
        </p>

        {/* Progress steps */}
        <div className="mt-10 flex flex-col gap-3 text-sm text-left">
          {["Parsing submission", "Running AI analysis", "Behavior evaluation", "Generating report"].map(
            (step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.8, duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.8 + 0.3 }}
                  className="w-2 h-2 rounded-full bg-primary"
                />
                <span className="text-muted-foreground">{step}</span>
              </motion.div>
            )
          )}
        </div>
      </motion.div>
    </PageContainer>
  );
};

export default ProcessingPage;
