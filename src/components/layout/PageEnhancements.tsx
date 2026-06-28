"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function PageEnhancements({ showProgress = false }: { showProgress?: boolean }) {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setShowTop(scrollTop > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {showProgress && (
        <div id="reading-progress" style={{ width: `${progress}%` }} />
      )}
      <button
        id="back-to-top"
        className={showTop ? "visible" : ""}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        style={{
          position: "fixed", bottom: "2rem", right: "2rem", zIndex: 50,
          display: "flex", alignItems: "center", justifyContent: "center",
          width: "2.5rem", height: "2.5rem", borderRadius: "50%",
          backgroundColor: "#7c3aed", color: "white", border: "none",
          cursor: "pointer", boxShadow: "0 4px 14px rgba(124,58,237,0.4)",
          opacity: showTop ? 1 : 0,
          transform: showTop ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          pointerEvents: showTop ? "all" : "none",
        }}
      >
        <ArrowUp size={16} />
      </button>
    </>
  );
}
