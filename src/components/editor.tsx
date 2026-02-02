"use client";

import styles from "@/app/page.module.css";
import { FormatButton } from "@/components/format-button";
import { useEditor } from "@/hooks/useEditor";
import EditorToolbar from "@/components/editor-toolbar";
import { EditorFooter } from "@/components/editor-footer";

export default function Editor() {
  const {
    text,
    setText,
    mounted,
    isTyping,
    isLoading,
    textareaRef,
    handleAiRewrite,
    applyFormat,
    removeFormat,
    isOverLimit,
    progressWidth,
    currentCharCount,
    charLimit,
    copyToClipboard,
  } = useEditor();

  return (
    <div className={styles["editor-card"]}>
      {/* Tool Bar using Reusable Components */}
      <EditorToolbar onFormat={applyFormat} onClear={removeFormat} />

      {/* Input Area */}
      <div className={styles["input-wrapper"]}>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your LinkedIn post here..."
          className={styles["main-textarea"]}
          readOnly={isTyping}
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
          {mounted ? (
            <>
              {currentCharCount.toLocaleString()} / {charLimit.toLocaleString()}
            </>
          ) : (
            `0 / ${charLimit.toLocaleString()}`
          )}{" "}
          Characters
        </div>
      </div>

      <EditorFooter
        onReset={() => setText("")}
        onRewrite={handleAiRewrite}
        isLoading={isLoading}
        isTyping={isTyping}
        hasText={!!text}
        text={text}
        copyToClipboard={copyToClipboard}
      />
    </div>
  );
}
