
'use client';

import dynamic from 'next/dynamic';

const LiveAssetMap = dynamic(() => import('@/components/dashboard/LiveAssetMap'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full w-full bg-slate-800/60 rounded-lg"><p className="text-slate-400">Loading map...</p></div>
});

export default function LiveAssetMapWrapper() {
  return <LiveAssetMap />;
}
