import styles from "@/app/page.module.css";
import { FormatButton } from "@/components/format-button";
import { formatters } from "@/utils/formatters";

type EditorToolbarProps = {
  onFormat: (type: keyof typeof formatters) => void;
  onClear :  () => void
};
export default function EditorToolbar({ onFormat, onClear }:EditorToolbarProps) {
  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles["format-group"]}>
          <FormatButton
            onClick={() => onFormat("bold")}
            className={styles.bold}
          >
            B
          </FormatButton>
          <FormatButton
            onClick={() => onFormat("italic")}
            className={styles.italic}
          >
            I
          </FormatButton>
          <FormatButton
            onClick={() => onFormat("boldItalic")}
            className={styles["bold-italic"]}
          >
            BI
          </FormatButton>
          <FormatButton
            onClick={() => onFormat("mono")}
            className={styles.mono}
          >
            M
          </FormatButton>
        </div>

        <button className={styles["btn-clear"]} onClick={onClear}>
          Clear Format
        </button>
      </div>
    </>
  );
}
