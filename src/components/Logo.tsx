export default function Logo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Stylized bird in flight — inspired by Taintlessness book cover */}
      <g fill="currentColor">
        {/* Left wing */}
        <path d="M2 16 C6 12, 12 10, 16 14 C12 13, 8 14, 5 17 Z" />
        {/* Right wing */}
        <path d="M34 16 C30 12, 24 10, 20 14 C24 13, 28 14, 31 17 Z" />
        {/* Body */}
        <path d="M18 10 C16.5 12, 16 14, 16.5 17 C17 19, 17.5 21, 17 24 L18 26 L19 24 C18.5 21, 19 19, 19.5 17 C20 14, 19.5 12, 18 10 Z" />
        {/* Small accent birds */}
        <path d="M10 18 C11 17, 12 17.5, 12 18.5 C11.5 18, 10.5 18, 10 18 Z" opacity="0.7" />
        <path d="M26 18 C25 17, 24 17.5, 24 18.5 C24.5 18, 25.5 18, 26 18 Z" opacity="0.7" />
        <path d="M14 21 C14.8 20.3, 15.5 20.5, 15.5 21.3 C15 21, 14.5 21, 14 21 Z" opacity="0.5" />
        <path d="M22 21 C21.2 20.3, 20.5 20.5, 20.5 21.3 C21 21, 21.5 21, 22 21 Z" opacity="0.5" />
      </g>
    </svg>
  );
}
