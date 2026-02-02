import { useState, useRef, useEffect } from "react";
import { useCompletion } from "@ai-sdk/react";
import { formatters, clearFormatting } from "@/utils/formatters";

export function useEditor() {
  const [text, setText] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const simulateTyping = (fullText: string) => {
    setIsTyping(true);


    let index = 0;
    const speed = 20;

    const typeWriter = () => {
      if (index <= fullText.length) {

        setText(fullText.substring(0, index));
        index++;
        setTimeout(typeWriter, speed);
      } else {
        setIsTyping(false);
      }
    };

    typeWriter();
  };
  const { isLoading, complete, completion } = useCompletion({
    api: "/api/chat",
    onFinish: (_prompt, result) => {
      try {
        simulateTyping(result);
      } catch (e) {
        console.error("JSON Parsing Error (Falling back to raw text):", e);
        setText(result);
        setIsTyping(false);
      }
    },

    onError: (err) => {
      if (
        err.message.includes("429") ||
        err.message.includes("Resource has been exhausted")
      ) {
        alert("Rate Limit Exceeded!!");
      }
      console.error(err);
      alert("Try again");
      setIsTyping(false);
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Integrate AI features
  const handleAiRewrite = async () => {
    if (!text.trim()) {
      alert("Write Something First");
      return;
    }
    await complete(text);
  };

  return {
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
  };
}
