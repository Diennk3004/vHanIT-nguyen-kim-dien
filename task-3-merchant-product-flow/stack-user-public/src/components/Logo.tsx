import React from "react";
import clsx from "clsx";
const Logo = () => {
  return (
    <div className={clsx(["font-(family-name:--font-jost)"])}>
      <span className={clsx(["text-red-600"])}>M</span>
      <span className={clsx(["text-red-600"])}>O</span>
      <span className={clsx(["text-red-600"])}>S</span>
      <span className={clsx(["text-red-600"])}>N</span>
      <span className={clsx(["text-red-600"])}>O</span>
    </div>
  );
};

export { Logo };
