
import { getActivityLogs } from "@/lib/actions/activityLogs";
import ActivityLogClientPage from "./components/ActivityLogClientPage";

export default async function ActivityLogPage({ searchParams }: { searchParams?: { page?: string } }) {
  const currentPage = Number(searchParams?.page) || 1;
  const { activityLogs, totalPages } = await getActivityLogs({ page: currentPage });

  return (
    <ActivityLogClientPage
      activityLogs={activityLogs}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  );
}
