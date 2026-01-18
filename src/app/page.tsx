import Header from '@/components/Header';
import MemeDisplay from '@/components/MemeDisplay';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50 flex items-start justify-center pt-4 md:pt-6 px-4 pb-8">
      <div className="w-full max-w-4xl">
        <Header />
        <MemeDisplay />
      </div>
    </main>
  );
}
