function Logo() {
  return (
    <svg width="220" height="60" viewBox="0 0 220 60" xmlns="http://www.w3.org/2000/svg">
      {/* דמויות */}
      <circle cx="25" cy="30" r="10" fill="#7c3aed"/>
      <circle cx="45" cy="30" r="10" fill="#a78bfa"/>
      <path d="M25 40 C25 45, 45 45, 45 40" stroke="#a78bfa" stroke-width="3" fill="none" />
      
      {/* שם האפליקציה */}
      <text x="60" y="37" fontFamily="Inter, sans-serif" fontSize="20" fill="#7c3aed" fontWeight="bold">
        Together
      </text>
    </svg>
  );
}

export default Logo;