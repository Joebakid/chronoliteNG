import React from "react";

export function Btn({ text, btnClassName = "", href, onClick }) {
  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn ${btnClassName}`}
    >
      {text}
    </a>
  ) : (
    <button onClick={onClick} className={`btn ${btnClassName}`}>
      {text}
    </button>
  );
}
