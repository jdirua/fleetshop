
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function ComingSoon() {
  const features = [
    "Real-Time Vehicle & Asset Tracking",
    "Comprehensive Work Order Management",
    "Automated Maintenance Scheduling",
    "Smart Inventory & Parts Management",
    "Detailed Fuel & Cost Analytics",
    "Driver & Mechanic Assignments",
    "Interactive Geofencing & Live Alerts"
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-6">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
          The Future of Fleet Management is Arriving Soon
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-10">
          We are building a powerful, intuitive, and centralized platform to give you complete control over your fleet operations. The full application is just around the corner.
        </p>
        
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8 shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-white">What to Expect:</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-left">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <CheckCircle className="text-green-400 h-6 w-6 flex-shrink-0" />
                <span className="text-slate-200">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors text-lg font-medium">
            &larr; Go Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
