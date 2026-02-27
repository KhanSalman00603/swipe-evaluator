import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import PageContainer from "@/components/PageContainer";
import { Upload, FileText, ArrowRight } from "lucide-react";

const UploadPage = () => {
  const { setSubmission, goToNextPage } = useAppContext();
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!text.trim() && !fileName) return;
    setSubmission({ text, fileName });
    goToNextPage();
  };

  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Upload Submission</h2>
        <p className="text-muted-foreground mb-8">Paste your text or upload a document for evaluation.</p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your academic submission here..."
          className="w-full h-48 rounded-xl bg-secondary border border-border p-4 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition font-mono text-sm"
        />

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
          />
          <button
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl glass hover:bg-secondary transition text-sm font-medium"
          >
            <Upload className="w-4 h-4 text-primary" />
            {fileName ? (
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                {fileName}
              </span>
            ) : (
              "Upload File"
            )}
          </button>

          <button
            onClick={handleSubmit}
            disabled={!text.trim() && !fileName}
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition ml-auto"
          >
            Submit
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </PageContainer>
  );
};

export default UploadPage;
