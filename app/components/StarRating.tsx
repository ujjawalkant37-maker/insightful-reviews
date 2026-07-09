"use client";

import React from "react";

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
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, index) => {
        const star = index + 1;

        return (
          <button
            key={star}
            type="button"
            disabled={!editable}
            onClick={() => editable && onChange?.(star)}
            className={`${editable ? "cursor-pointer" : "cursor-default"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill={star <= value ? "#facc15" : "none"}
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