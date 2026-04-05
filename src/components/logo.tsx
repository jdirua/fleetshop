import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/dashboard" className="text-2xl font-bold tracking-tighter text-white whitespace-nowrap">
      FLEETSHOP
    </Link>
  );
};

export default Logo;