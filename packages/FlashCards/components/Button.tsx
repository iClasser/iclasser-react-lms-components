"use client";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  xs?: boolean;
  sm?: boolean;
  lg?: boolean;
  xl?: boolean;
  xxl?: boolean;
  xxxl?: boolean;
  left?: boolean;
  secondary?: boolean;
  disabled?: any;
  green?: boolean;
  blue?: boolean;
  red?: boolean;
  formAction?: any;
  inverse?: boolean; // inverse color
  // trackingFunc for analytics
  trackingFunc?: () => void;
}

function Button(props: ButtonProps) {
  let {
    children,
    onClick,
    disabled = false,
    className,
    secondary,
    type,
    xs,
    sm,
    lg,
    xl,
    xxl,
    xxxl,
    left,
    green,
    blue,
    red,
    formAction,
    inverse,
  } = props;
  let defaultClassName = "py-2 px-4 rounded-md  group";

  let defaultColor =
    "px-4 py-2 bg-black text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300";
  if (secondary)
    defaultColor = "text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800";
  if (inverse && secondary)
    defaultColor = "text-background dark:text-foreground hover:underline";
  if (disabled)
    defaultColor =
      "text-foreground dark:text-background bg-gray-200/40 cursor-not-allowed";
  if (green)
    defaultColor = "bg-green-500 text-white dark:bg-green-400 hover:underline";
  if (blue)
    defaultColor = "bg-blue-500 text-white dark:bg-blue-400 hover:underline";
  if (red)
    defaultColor = "bg-red-500 text-white dark:bg-red-400 hover:underline";
  defaultClassName = defaultClassName + " " + defaultColor;

  let defaultSize = "text-sm";
  if (xs) defaultSize = "text-[9px]";
  if (xs) defaultClassName = "px-1 rounded-md group" + " " + defaultColor;
  if (sm) defaultSize = "text-xs";
  if (lg) defaultSize = "text-lg";
  if (xl) defaultSize = "text-xl";
  if (xxl) defaultSize = "text-2xl";
  if (xxxl) defaultSize = "text-3xl";
  defaultClassName = defaultClassName + " " + defaultSize;

  let textAlign = "text-center";
  if (left) textAlign = "flex justify-start";
  defaultClassName = defaultClassName + " " + textAlign;

  if (className) defaultClassName = defaultClassName + " " + className;

  const buttonProps = type ? { type } : {};

  return (
    <button
      {...(formAction ? { formAction } : {})}
      disabled={disabled}
      onClick={onClick}
      className={defaultClassName}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

export default Button;
