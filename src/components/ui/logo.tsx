import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  size?: 'default' | 'large';
}

export const Logo = ({ size = 'default' }: LogoProps) => {
  const dimensions = size === 'large' 
    ? "w-[300px] h-[125px]"  // Larger size for landing page
    : "w-[180px] h-[75px]";  // Default size for other pages

  return (
    <Link href="/" className="flex items-center justify-center">
      <div className={`relative ${dimensions}`}>
        <Image
          src="/recifylogo.png"
          alt="Recify Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
    </Link>
  );
};