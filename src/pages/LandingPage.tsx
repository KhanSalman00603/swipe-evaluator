import { motion } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import PageContainer from "@/components/PageContainer";
import { ArrowDown, Brain, Shield, Zap } from "lucide-react";

const LandingPage = () => {
  const { goToNextPage } = useAppContext();

  return (
    <PageContainer className="dot-grid relative">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-3xl relative z-10"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-foreground mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-success animate-pulse-glow" />
          AI-Powered Academic Integrity
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
          <span className="text-primary glow-text">Rubric</span>{" "}
          <span className="text-foreground">AI</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-xl mx-auto leading-relaxed">
          AI‑Powered Academic Evaluation and Proctoring System
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {[
            { icon: Brain, label: "AI Analysis" },
            { icon: Shield, label: "Proctoring" },
            { icon: Zap, label: "Real‑time" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-lg glass text-sm text-secondary-foreground">
              <Icon className="w-4 h-4 text-primary" />
              {label}
            </div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={goToNextPage}
          className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg glow-primary transition-all"
        >
          Get Started
        </motion.button>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 text-muted-foreground"
      >
        <ArrowDown className="w-5 h-5" />
      </motion.div>
    </PageContainer>
  );
};

export default LandingPage;
