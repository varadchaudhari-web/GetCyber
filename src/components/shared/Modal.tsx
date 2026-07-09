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
    return () => { document.body.style.overflow = ""; };
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className={cn(
          "relative w-full glass-card flex flex-col max-h-[90vh] animate-slide-up",
          sizeClasses[size],
          className
        )}
      >
        {/* Header */}
        {(title || showClose) && (
          <div className="flex items-start justify-between p-5 border-b border-dark-border flex-shrink-0">
            {title && (
              <div>
                <h2 className="text-lg font-bold text-white">{title}</h2>
                {subtitle && <p className="text-sm text-dark-text mt-0.5">{subtitle}</p>}
              </div>
            )}
            {showClose && (
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-dark-card rounded-lg text-dark-text hover:text-white transition-all ml-4 flex-shrink-0"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="p-5 border-t border-dark-border flex-shrink-0">{footer}</div>
        )}
      </div>
    </div>
  );
}
