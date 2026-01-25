import styles from "@/app/page.module.css";

interface FormatButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}

export const FormatButton = ({ onClick, className, children }: FormatButtonProps) => {
  return (
    <button
      className={`${styles["btn-tool"]} ${className || ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};