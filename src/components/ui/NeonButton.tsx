import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/utils";

interface NeonButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "warning";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: LucideIcon;
}

export const NeonButton = ({ children, variant = "primary", onClick, disabled, className, icon: Icon }: NeonButtonProps) => {
  const baseStyle = "relative px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 overflow-hidden border cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "border-brand-cyan text-brand-cyan hover:bg-brand-cyan/10 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]",
    secondary: "border-[#444] text-[#aaa] hover:text-white hover:border-[#666] hover:bg-[#222]",
    danger: "border-brand-red text-brand-red hover:bg-brand-red/10 hover:shadow-[0_0_15px_rgba(255,51,102,0.3)]",
    warning: "border-brand-yellow text-brand-yellow hover:bg-brand-yellow/10 hover:shadow-[0_0_15px_rgba(255,251,0,0.3)]",
  };

  return (
    <motion.button 
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(baseStyle, variants[variant], className)}
    >
      <div className="absolute inset-0 bg-current opacity-0 hover:opacity-[0.03] transition-opacity" />
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </motion.button>
  );
};
