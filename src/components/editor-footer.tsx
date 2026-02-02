import styles from "@/app/page.module.css";

interface FooterProps {
  onReset: () => void;
  onRewrite: () => void;
  isLoading: boolean;
  isTyping: boolean;
  hasText: boolean;
  text: string;
  copyToClipboard: () => Promise<void>;
}

export const EditorFooter = ({
  onReset,
  onRewrite,
  isLoading,
  isTyping,
  hasText,
  text,
  copyToClipboard,
}: FooterProps) => {
  return (
    <div className={styles["action-footer"]}>
      <button
        className={styles["btn-secondary"]}
        onClick={onReset}
        disabled={isTyping}
      >
        Reset
      </button>

      <button
        onClick={onRewrite}
        disabled={isLoading || isTyping || !hasText}
        style={{
          background: isTyping
            ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
            : "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",

          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          display: "flex",
          gap: "8px",
        }}
      >
        {isLoading
          ? "🌀 Thinking..."
          : isTyping
          ? "⚡ Writing..."
          : "✨ Magic Rewrite"}
      </button>

      <button className={styles["btn-primary"]} onClick={copyToClipboard}>
        Copy Formatted
      </button>
    </div>
  );
};
