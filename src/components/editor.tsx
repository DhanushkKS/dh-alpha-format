"use client";

import { useState, useRef } from "react";
import { formatters, clearFormatting } from "@/utils/formatters";
import styles from "@/app/page.module.css";
import { FormatButton } from "@/components/format-button";

export default function Editor() {
  const [text, setText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const charLimit = 3000;
  const currentCharCount = text.length;
  const isOverLimit = currentCharCount > charLimit;
  const progressWidth = Math.min((currentCharCount / charLimit) * 100, 100);


  const handleTextTransformation = (
    transformFn: (selectedText: string) => string,
  ) => {
    const el = textareaRef.current;
    if (!el) return;

    const savedScrollTop = el.scrollTop; // Scroll fix
    const start = el.selectionStart;
    const end = el.selectionEnd;

    if (start === end) return;

    const selectedPart = text.substring(start, end);
    const beforePart = text.substring(0, start);
    const afterPart = text.substring(end);

    const transformed = transformFn(selectedPart);
    const newText = beforePart + transformed + afterPart;

    setText(newText);

    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start, start + transformed.length);
      el.scrollTop = savedScrollTop;
    }, 0);
  };

  const applyFormat = (type: keyof typeof formatters) => {
    handleTextTransformation((selected) =>
      formatters[type](clearFormatting(selected)),
    );
  };

  const removeFormat = () => {
    handleTextTransformation((selected) => clearFormatting(selected));
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className={styles["editor-card"]}>
      {/* Tool Bar using Reusable Components */}
      <div className={styles.toolbar}>
        <div className={styles["format-group"]}>
          <FormatButton
            onClick={() => applyFormat("bold")}
            className={styles.bold}
          >
            B
          </FormatButton>
          <FormatButton
            onClick={() => applyFormat("italic")}
            className={styles.italic}
          >
            I
          </FormatButton>
          <FormatButton
            onClick={() => applyFormat("boldItalic")}
            className={styles["bold-italic"]}
          >
            BI
          </FormatButton>
          <FormatButton
            onClick={() => applyFormat("mono")}
            className={styles.mono}
          >
            M
          </FormatButton>
        </div>

        <button className={styles["btn-clear"]} onClick={removeFormat}>
          Clear Format
        </button>
      </div>

      {/* Input Area */}
      <div className={styles["input-wrapper"]}>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your LinkedIn post here..."
          className={styles["main-textarea"]}
        />
      </div>

      {/* Character Counter */}
      <div className={styles["counter-container"]}>
        <div className={styles["progress-wrapper"]}>
          <div
            className={`${styles["progress-bar"]} ${
              isOverLimit ? styles["bg-danger"] : ""
            }`}
            style={{ width: `${progressWidth}%` }}
          ></div>
        </div>
        <div
          className={`${styles["char-text"]} ${
            isOverLimit ? styles["text-danger"] : ""
          }`}
        >
          {currentCharCount.toLocaleString()} / {charLimit.toLocaleString()}{" "}
          Characters
        </div>
      </div>

      {/* Actions */}
      <div className={styles["action-footer"]}>
        <button className={styles["btn-secondary"]} onClick={() => setText("")}>
          Reset
        </button>
        <button className={styles["btn-primary"]} onClick={copyToClipboard}>
          Copy Formatted Text
        </button>
      </div>
    </div>
  );
}
