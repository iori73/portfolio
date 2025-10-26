'use client';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TechnicalTooltipProps {
  children: React.ReactNode;
  content: string;
}

const TechnicalTooltip: React.FC<TechnicalTooltipProps> = ({ children, content }) => {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="px-2 py-0.5 rounded-md bg-[#f5f5f7] text-[#1d1d1f] font-medium cursor-help inline-flex items-center">
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent className="bg-black/50 backdrop-blur-md border-white/20 text-white shadow-lg">
          <p className="p-1 max-w-xs text-md">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TechnicalTooltip;
