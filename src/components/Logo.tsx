import Image from 'next/image';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Image
      src="/images/logo-bird-sm.png"
      alt="Omar AlBeshr logo"
      width={32}
      height={34}
      className={className}
    />
  );
}
