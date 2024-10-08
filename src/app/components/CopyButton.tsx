"use client";
import React, { useState } from "react";
import ContentCopySharpIcon from "@mui/icons-material/ContentCopySharp";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";

interface CopyButtonProps {
  url: string;
}

export default function CopyButton({ url }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };
  return (
    <button
      onClick={handleCopy}
      className="btn-icon text-success/30 hover:text-success focus-visible:text-success ml-2"
    >
      {isCopied ? (
        <DoneSharpIcon className="fill-success" />
      ) : (
        <ContentCopySharpIcon />
      )}
    </button>
  );
}
