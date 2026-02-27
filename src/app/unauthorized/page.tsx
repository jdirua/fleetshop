
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="max-w-md w-full text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-lg text-gray-700 mb-6">You do not have the necessary permissions to view this page.</p>
        <Link href="/dashboard">
          <a className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Go to Dashboard</a>
        </Link>
      </div>
    </div>
  );
}
