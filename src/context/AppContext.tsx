import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface SubmissionData {
  text: string;
  fileName: string | null;
}

interface EvaluationResults {
  academicScore: number;
  aiLikelihood: number;
  confidenceScore: number;
  behaviorStatus: "normal" | "suspicious" | "flagged";
  emotionState: string;
  cheatingWarnings: string[];
  flaggedStatus: boolean;
  finalResult: string;
}

interface AppState {
  currentPage: number;
  submission: SubmissionData;
  evaluation: EvaluationResults;
  isProcessing: boolean;
}

interface AppContextType {
  state: AppState;
  setCurrentPage: (page: number) => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  setSubmission: (data: SubmissionData) => void;
  setEvaluation: (data: EvaluationResults) => void;
  setIsProcessing: (val: boolean) => void;
  totalPages: number;
}

const defaultEvaluation: EvaluationResults = {
  academicScore: 82,
  aiLikelihood: 12,
  confidenceScore: 91,
  behaviorStatus: "normal",
  emotionState: "Focused",
  cheatingWarnings: [],
  flaggedStatus: false,
  finalResult: "Pass — Original Work",
};

const AppContext = createContext<AppContextType | null>(null);

export const TOTAL_PAGES = 6;

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppState>({
    currentPage: 0,
    submission: { text: "", fileName: null },
    evaluation: defaultEvaluation,
    isProcessing: false,
  });

  const setCurrentPage = useCallback((page: number) => {
    setState((s) => ({ ...s, currentPage: Math.max(0, Math.min(page, TOTAL_PAGES - 1)) }));
  }, []);

  const goToNextPage = useCallback(() => {
    setState((s) => ({
      ...s,
      currentPage: Math.min(s.currentPage + 1, TOTAL_PAGES - 1),
    }));
  }, []);

  const goToPrevPage = useCallback(() => {
    setState((s) => ({
      ...s,
      currentPage: Math.max(s.currentPage - 1, 0),
    }));
  }, []);

  const setSubmission = useCallback((data: SubmissionData) => {
    setState((s) => ({ ...s, submission: data }));
  }, []);

  const setEvaluation = useCallback((data: EvaluationResults) => {
    setState((s) => ({ ...s, evaluation: data }));
  }, []);

  const setIsProcessing = useCallback((val: boolean) => {
    setState((s) => ({ ...s, isProcessing: val }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        setCurrentPage,
        goToNextPage,
        goToPrevPage,
        setSubmission,
        setEvaluation,
        setIsProcessing,
        totalPages: TOTAL_PAGES,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
