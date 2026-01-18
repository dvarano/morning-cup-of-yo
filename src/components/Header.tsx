import Image from 'next/image';

export default function Header() {
  return (
    <header className="flex items-center justify-center gap-6 mb-12 px-4 py-6 bg-gray-100 rounded-xl">
      <div className="flex-shrink-0">
        <Image
          src="/icon.png"
          alt="Morning Cup of Yo Logo"
          width={90}
          height={90}
          className="rounded-2xl shadow-xl"
          priority
        />
      </div>
      <div className="text-left">
        <h1
          className="text-4xl md:text-5xl font-bold"
          style={{
            background: 'linear-gradient(to right, #f97316, #eab308)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
          }}
        >
          Your daily fix of Yo memes
        </h1>
      </div>
    </header>
  );
}
