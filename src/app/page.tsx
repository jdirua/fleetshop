
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car, Wrench, Package, Building, Fuel, FileText } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1">
        <section
          className="w-full py-20 md:py-32 lg:py-40 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1599793393523-7a2d4886c92a?q=80&w=2070&auto=format&fit=crop')`,
          }}
        >
          <div className="container mx-auto px-4 md:px-6 text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">FleetShop</h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-200 mb-8">
              The all-in-one solution for managing your vehicle fleet with unparalleled efficiency and control.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/login">
                <Button size="lg">Get Started</Button>
              </Link>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">At a Glance</h2>
              <p className="text-gray-600 mt-2">A real-time overview of your fleet&apos;s status.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               <FeatureCard
                icon={<Car className="w-8 h-8 text-blue-500" />}
                title="Vehicle Management"
                value="Centralized"
                description="Keep detailed records of every vehicle in your fleet."
              />
              <FeatureCard
                icon={<Wrench className="w-8 h-8 text-green-500" />}
                title="Work Orders"
                value="Streamlined"
                description="Create, assign, and track maintenance and repair orders."
              />
              <FeatureCard
                icon={<Package className="w-8 h-8 text-yellow-500" />}
                title="Inventory Control"
                value="Optimized"
                description="Manage parts and supplies to reduce waste and downtime."
              />
              <FeatureCard
                icon={<Building className="w-8 h-8 text-purple-500" />}
                title="Vendor Management"
                value="Organized"
                description="Maintain a database of preferred vendors and suppliers."
              />
              <FeatureCard
                icon={<Fuel className="w-8 h-8 text-red-500" />}
                title="Fuel Logging"
                value="Accurate"
                description="Track fuel consumption and costs across your entire fleet."
              />
              <FeatureCard
                icon={<FileText className="w-8 h-8 text-indigo-500" />}
                title="Document Storage"
                value="Secure"
                description="Store important documents like titles and registrations."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <p>&copy; 2024 FleetShop. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-gray-300">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-gray-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, value, description }: { icon: React.ReactNode; title: string; value: string; description: string }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
}
