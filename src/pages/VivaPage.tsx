import { motion } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import PageContainer from "@/components/PageContainer";
import { Camera, Eye, AlertTriangle, Smile, ShieldCheck } from "lucide-react";

const VivaPage = () => {
  const { goToNextPage } = useAppContext();

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl"
      >
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-3xl font-bold">Viva Session</h2>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-success/15 text-success">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse-glow" />
            Live
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Camera feed */}
          <div className="md:col-span-2 aspect-video rounded-2xl bg-secondary border border-border flex items-center justify-center relative overflow-hidden gradient-border">
            <div className="absolute inset-0 dot-grid opacity-30" />
            <div className="flex flex-col items-center gap-3 text-muted-foreground relative z-10">
              <Camera className="w-12 h-12 text-primary/50" />
              <span className="text-sm">Camera Feed</span>
            </div>
            {/* Recording indicator */}
            <div className="absolute top-4 left-4 flex items-center gap-2 text-xs text-destructive font-medium">
              <span className="w-2 h-2 rounded-full bg-destructive animate-pulse-glow" />
              REC
            </div>
          </div>

          {/* Status panel */}
          <div className="flex flex-col gap-4">
            {[
              { icon: Eye, label: "Camera", value: "Active", color: "text-success" },
              { icon: ShieldCheck, label: "Monitoring", value: "Behavior", color: "text-primary" },
              { icon: Smile, label: "Emotion", value: "Focused", color: "text-primary" },
              { icon: AlertTriangle, label: "Warnings", value: "None", color: "text-success" },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="flex items-center gap-3 p-3 rounded-xl glass">
                <Icon className={`w-5 h-5 ${color}`} />
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-medium">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={goToNextPage}
            className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold"
          >
            End Session & Evaluate
          </motion.button>
        </div>
      </motion.div>
    </PageContainer>
  );
};

export default VivaPage;
