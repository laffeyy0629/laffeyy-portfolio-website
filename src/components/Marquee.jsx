const ITEMS = [
  'FULL STACK DEVELOPER', '✦', 'REACT', '✦', 'TYPESCRIPT', '✦',
  'NODE.JS', '✦', 'UI/UX DESIGN', '✦', 'OPEN TO WORK', '✦',
  'NEXT.JS', '✦', 'PYTHON', '✦', 'DOCKER', '✦', 'POSTGRESQL', '✦',
];

export default function Marquee({ reverse = false, dim = false }) {
  return (
    <div className="relative overflow-hidden border-y border-white/[0.05] py-[14px] bg-black">
      <div
        className="flex whitespace-nowrap will-change-transform"
        style={{
          animation: `${reverse ? 'marquee-reverse' : 'marquee'} 38s linear infinite`,
        }}
      >
        {[...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={i}
            className={`inline-block mx-6 font-mono text-[10px] tracking-[0.28em] ${
              item === '✦'
                ? 'text-[#f72585]/50'
                : dim
                ? 'text-[#1e1e1e]'
                : 'text-[#282828]'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
