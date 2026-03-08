export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 px-6 bg-black border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 text-sm">
        <a
          href="#"
          className="text-white font-semibold tracking-tight text-base"
        >
          YourName<span className="text-[#f72585]">.</span>
        </a>

        <p className="text-[#3a3a3a]">
          © {year} YourName. Crafted with React &amp; Tailwind CSS.
        </p>

        <div className="flex items-center gap-6">
          {['About', 'Projects', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[#3a3a3a] hover:text-white transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
