import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Register the project's custom font-size tokens so tailwind-merge treats them as
// font-sizes, not text colors. Without this, e.g. `text-body-lg` is mistaken for a
// color and silently drops a real `text-white`/`text-ink` in the same cn() call.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display", "headline", "title-lg", "title", "title-sm",
            "body-lg", "body", "body-sm", "label", "caption",
            // legacy scale
            "body-xs", "body-base", "body-xl", "body-2xl", "body-3xl", "body-4xl",
            "heading-sm", "heading-base", "heading-lg", "heading-xl",
            "heading-2xl", "heading-3xl", "heading-4xl",
            "caption-xs", "caption-sm", "caption-base", "caption-lg", "caption-xl", "caption-2xl",
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
