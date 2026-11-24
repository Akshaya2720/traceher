import React from 'react';

interface ShieldLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const ShieldLogo: React.FC<ShieldLogoProps> = ({ className = '', size = 32, showText = true }) => {
  return (
    <div className={`flex items-center gap-2.5 cursor-pointer select-none ${className}`}>
      <div 
        className="relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-[#6556D9] to-[#8877EC] text-white shadow-sm shadow-[#6556D9]/20"
        style={{ width: size, height: size }}
      >
        <svg
          width={size * 0.58}
          height={size * 0.58}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" strokeWidth="2.5" />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className="font-heading font-extrabold tracking-tight text-[#17172F] text-lg leading-none">
            TRACE<span className="text-[#6556D9]">HER</span>
          </span>
          <span className="text-[10px] tracking-wider uppercase font-medium text-[#777A91] leading-none mt-0.5">
            Evidence Intelligence
          </span>
        </div>
      )}
    </div>
  );
};
