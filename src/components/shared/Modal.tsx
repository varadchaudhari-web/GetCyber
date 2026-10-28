import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  footer?: React.ReactNode;
  showClose?: boolean;
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  size = "md",
  footer,
  showClose = true,
  className,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-6xl",
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 perspective-1200"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      {/* Backdrop blur */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in" />

      {/* 3D Glassmorphic Modal Window */}
      <div
        className={cn(
          "relative w-full flex flex-col max-h-[90vh] rounded-[24px] bg-[#0A0F1D]/95 backdrop-blur-2xl border border-cyber-blue/35 shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(37,99,235,0.22)] overflow-hidden animate-slide-up hover:border-cyber-blue/60 transition-all duration-300",
          sizeClasses[size],
          className
        )}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Top glowing laser line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyber-blue to-transparent opacity-80" />

        {/* Header */}
        {(title || showClose) && (
          <div className="flex items-start justify-between p-5 sm:p-6 border-b border-white/10 flex-shrink-0 bg-[#05070F]/50">
            {title && (
              <div>
                <h2 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyber-blue animate-pulse" />
                  {title}
                </h2>
                {subtitle && <p className="text-xs sm:text-sm text-slate-400 mt-1">{subtitle}</p>}
              </div>
            )}
            {showClose && (
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all ml-4 flex-shrink-0 border border-white/5"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 text-slate-200">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="p-4 sm:p-5 border-t border-white/10 flex-shrink-0 bg-[#05070F]/60 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
