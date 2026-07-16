"use client";

import React, { useState } from "react";

type Props = {
  value: number;
  max?: number;
  size?: number;
  editable?: boolean;
  onChange?: (value: number) => void;
};

export default function StarRating({
  value,
  max = 5,
  size = 22,
  editable = false,
  onChange,
}: Props) {
  const [hover, setHover] = useState<number | null>(null);

  const displayValue = hover ?? value;

  return (
    <div
      className="flex items-center gap-1"
      role={editable ? "radiogroup" : "img"}
      aria-label={`Rating ${value} out of ${max}`}
    >
      {Array.from({ length: max }).map((_, index) => {
        const star = index + 1;

        return (
          <button
            key={star}
            type="button"
            disabled={!editable}
            aria-label={`${star} Star`}
            aria-checked={value === star}
            role={editable ? "radio" : undefined}
            tabIndex={editable ? 0 : -1}
            onClick={() => editable && onChange?.(star)}
            onMouseEnter={() =>
              editable && setHover(star)
            }
            onMouseLeave={() =>
              editable && setHover(null)
            }
            onKeyDown={(e) => {
              if (!editable) return;

              if (
                e.key === "Enter" ||
                e.key === " "
              ) {
                e.preventDefault();
                onChange?.(star);
              }
            }}
            className={`transition-transform ${
              editable
                ? "cursor-pointer hover:scale-110"
                : "cursor-default"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill={
                star <= displayValue
                  ? "#facc15"
                  : "none"
              }
              stroke="#facc15"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}