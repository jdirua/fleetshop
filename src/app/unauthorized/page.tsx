
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gravel-noise flex flex-col items-center justify-center text-center p-4">
      <div className="max-w-md p-8 glass-card rounded-lg">
        <h1 className="text-5xl font-bold text-destructive mb-4">Access Denied</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Sorry, you do not have the necessary permissions to access this page.
        </p>
        <Button asChild>
          <Link href="/dashboard">
            Return to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}
