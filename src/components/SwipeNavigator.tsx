import { useEffect, useCallback, useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "@/context/AppContext";

interface SwipeNavigatorProps {
  children: ReactNode[];
}

const SwipeNavigator = ({ children }: SwipeNavigatorProps) => {
  const { state, setCurrentPage } = useAppContext();
  const isAnimating = useRef(false);
  const touchStartY = useRef(0);

  const navigate = useCallback(
    (direction: "up" | "down") => {
      if (isAnimating.current) return;
      isAnimating.current = true;
      setTimeout(() => (isAnimating.current = false), 600);

      if (direction === "up") {
        setCurrentPage(state.currentPage + 1);
      } else {
        setCurrentPage(state.currentPage - 1);
      }
    },
    [state.currentPage, setCurrentPage]
  );

  // Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        navigate("up");
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        navigate("down");
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate]);

  // Wheel
  useEffect(() => {
    let accumulated = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      accumulated += e.deltaY;

      clearTimeout(timeout);
      timeout = setTimeout(() => (accumulated = 0), 150);

      if (Math.abs(accumulated) > 50) {
        navigate(accumulated > 0 ? "up" : "down");
        accumulated = 0;
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [navigate]);

  // Touch
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) > 50) {
        navigate(delta > 0 ? "up" : "down");
      }
    };
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [navigate]);

  const variants = {
    enter: (direction: number) => ({ y: direction > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (direction: number) => ({ y: direction > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Page indicators */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {children.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (!isAnimating.current) {
                isAnimating.current = true;
                setTimeout(() => (isAnimating.current = false), 600);
                setCurrentPage(i);
              }
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === state.currentPage
                ? "bg-primary h-6 glow-primary"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait" custom={state.currentPage}>
        <motion.div
          key={state.currentPage}
          custom={1}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          {children[state.currentPage]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SwipeNavigator;
