import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Truck, Wrench, ClipboardList } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full text-white overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.9)),
            url('/concretetruck.png')
          `,
        }}
      />

      {/* Main Content container */}
      <div className="relative z-20 flex flex-col min-h-screen items-center justify-center p-4 sm:p-6 md:p-8 pt-32 pb-24">
        <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
          <h1 className="text-2xl font-bold tracking-tighter text-white">FleetShop</h1>
        </header>

        {/* Main Hero Glass Card */}
        <main className="w-full max-w-4xl bg-black/50 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl p-8 sm:p-12 text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tighter mb-4">
            The Future of Fleet Management is Here.
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            FleetShop provides an all-in-one solution to manage your vehicles, track maintenance, and optimize your operations with powerful AI-driven insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="bg-violet-600 hover:bg-violet-700 px-10 py-6 text-lg font-semibold w-full sm:w-auto shadow-lg shadow-violet-500/50">
                Get Started
              </Button>
            </Link>
            <Link href="/coming-soon">
              <Button 
                size="lg" 
                className="bg-blue-900 hover:bg-blue-950 text-white font-semibold px-10 py-6 text-lg w-full sm:w-auto shadow-lg shadow-blue-900/50"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </main>

        {/* Key Features Section with Glass Cards */}
        <section className="w-full max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-10">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Truck className="w-8 h-8 text-violet-400" />}
              title="Vehicle Management"
              description="Keep a detailed record of all your vehicles, including specifications, service history, and assigned drivers."
            />
            <FeatureCard
              icon={<Wrench className="w-8 h-8 text-violet-400" />}
              title="Work Order Tracking"
              description="Create, assign, and monitor work orders for maintenance and repairs."
            />
            <FeatureCard
              icon={<ClipboardList className="w-8 h-8 text-violet-400" />}
              title="Inventory Control"
              description="Manage spare parts with automated low-stock alerts and consumption reports."
            />
          </div>
        </section>
        
        <footer className="absolute bottom-0 py-4 text-center text-slate-400 text-sm">
          © {new Date().getFullYear()} FleetShop. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <div className="bg-black/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl text-center items-center flex flex-col shadow-xl hover:border-violet-400/50 transition-colors">
      <div className="mb-4 flex items-center justify-center w-16 h-16 bg-violet-950/60 rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </div>
  );
}
