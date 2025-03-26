"use client";

import React, { useState } from "react";

export default function InteractiveCard({
  children,
  Element,
}: {
  children: React.ReactNode;
  Element: string;
}) {
  const [isHovered, setIsHovered] = useState(false);


  return (
    <div
      className={`w-[410px] h-[440px] rounded-lg ${isHovered ? 'bg-neutral-200 shadow-2xl' : 'bg-white shadow-lg'} transition-all`}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
}
