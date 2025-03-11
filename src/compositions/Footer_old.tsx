// /components/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full py-12 bg-[#F2F2F2]">
      {/* 
        モバイル: gap-6 (1.5rem), px-6 (1.5rem)
        md以上: gap-16, px-0
      */}
      <div className="flex justify-center gap-6 px-6 mb-8 md:gap-16 md:px-0">
        {/* LinkedIn */}
        <Link
          href="https://www.linkedin.com/in/iori-kawano-131a4122a/"
          aria-label="LinkedIn"
          target="_blank"
          rel="noreferrer"
        >
          <Image src="/socials/LinkedIn.svg" alt="LinkedIn" width={40} height={40} className="w-8 h-8 md:w-10 md:h-10" />
        </Link>

        {/* Behance */}
        <Link
          href="https://www.behance.net/835e5127"
          aria-label="Behance"
          target="_blank"
          rel="noreferrer"
        >
          <Image src="/socials/Behance.svg" alt="Behance" width={40} height={40} className="w-8 h-8 md:w-10 md:h-10" />
        </Link>

        {/* GitHub */}
        <Link
          href="https://github.com/iori73"
          aria-label="GitHub"
          target="_blank"
          rel="noreferrer"
        >
          <Image src="/socials/GitHub.svg" alt="GitHub" width={40} height={40} className="w-8 h-8 md:w-10 md:h-10" />
        </Link>

        {/* Twitter / X */}
        <Link
          href="https://twitter.com/iori73wsy"
          aria-label="Twitter/X"
          target="_blank"
          rel="noreferrer"
        >
          <Image src="/socials/X.svg" alt="Twitter/X" width={40} height={40} className="w-8 h-8 md:w-10 md:h-10" />
        </Link>

        {/* Medium */}
        <Link
          href="https://medium.com/@iori730002204294"
          aria-label="Medium"
          target="_blank"
          rel="noreferrer"
        >
          <Image src="/socials/Medium.svg" alt="Medium" width={40} height={40} className="w-8 h-8 md:w-10 md:h-10" />
        </Link>

        {/* note */}
        <Link
          href="https://note.com/io_73"
          aria-label="note"
          target="_blank"
          rel="noreferrer"
        >
          <Image src="/socials/note.svg" alt="note" width={40} height={40} className="w-8 h-8 md:w-10 md:h-10" />
        </Link>
      </div>

      <p className="text-center text-body-m-140 md:text-body-l-140 font-sf-pro">© 2025 Iori Kawano</p>
    </footer>
  );
}
