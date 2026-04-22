import DashboardSkeleton from '../../ui/skeletons';

// SRBIJA - Koristimo folder name (naziv-foldera) kako bismo izolovali logiku da se ne pojavljuje i na drugim stranicama koje su u ovom pathu, kao sto su customers i invoices. u ovom slucaju izolujemo DashoardSkeleton
export default function Loading() {
	return <DashboardSkeleton />;
}
