'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Dialog, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { X } from 'lucide-react';

const STEPS = Array.from({ length: 9 }, (_, i) => ({
  number: i + 1,
  image: `/work/ukiyoe/process-toppage/${String(i + 1).padStart(2, '0')}.png`,
}));

export default function TopPageEvolutionGrid() {
  const t = useTranslations('ukiyoe');
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const selectedImage = selectedStep !== null
    ? STEPS.find(s => s.number === selectedStep)
    : null;

  return (
    <>
      <div className="w-full overflow-hidden rounded-lg bg-[#F8F5F0] p-2 sm:p-3 md:p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          {STEPS.map((step) => (
            <button
              key={step.number}
              type="button"
              onClick={() => setSelectedStep(step.number)}
              className="relative overflow-hidden rounded-md bg-[#F8F5F0] text-left cursor-zoom-in active:scale-[0.97] transition-transform"
            >
              <span
                className="absolute left-2 top-2 z-10 flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full bg-white/95 text-caption font-semibold font-space-grotesk text-ink shadow-sm"
                aria-hidden
              >
                {step.number}
              </span>
              <div className="relative aspect-[589/431] w-full">
                <Image
                  src={step.image}
                  alt={t('topPageDesignStepAlt', { step: step.number })}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-contain object-bottom"
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={selectedStep !== null} onOpenChange={() => setSelectedStep(null)}>
        <DialogContent className="max-w-[95vw] md:max-w-3xl p-0 bg-transparent border-none shadow-none rounded-none [&>button:last-child]:hidden">
          <DialogTitle className="sr-only">
            {selectedStep !== null
              ? t('topPageDesignStepAlt', { step: selectedStep })
              : ''}
          </DialogTitle>
          <div className="flex flex-col items-end gap-3">
            <DialogClose className="flex items-center justify-center w-8 h-8 rounded-full bg-white/70 text-ink hover:bg-white transition-colors shadow-md">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
            {selectedImage && (
              <div className="relative w-full aspect-[589/431] overflow-hidden">
                <Image
                  src={selectedImage.image}
                  alt={t('topPageDesignStepAlt', { step: selectedImage.number })}
                  fill
                  sizes="95vw"
                  className="object-contain"
                  priority
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
