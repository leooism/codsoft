export default function formatDate(date: string) {
	return Intl.DateTimeFormat("US", {
		year: "numeric",
		month: "numeric",
		day: "numeric",
	}).format(new Date(date));
}
