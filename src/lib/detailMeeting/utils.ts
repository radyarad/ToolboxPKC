// Badge helpers
export function getTypeBadgeVariant(
  type: string
): "default" | "destructive" | "outline" | "secondary" {
  switch (type) {
    case "important":
      return "destructive";
    case "recurring":
      return "default";
    case "technical":
      return "secondary";
    case "event":
      return "outline";
    default:
      return "secondary";
  }
}

export function getStatusBadgeVariant(
  status: string
): "default" | "destructive" | "outline" | "secondary" {
  switch (status) {
    case "confirmed":
      return "default";
    case "tentative":
      return "outline";
    case "cancelled":
      return "destructive";
    default:
      return "secondary";
  }
}

export function getActionStatusBadge(
  status: string
): "default" | "destructive" | "outline" | "secondary" {
  switch (status) {
    case "completed":
      return "default";
    case "in-progress":
      return "outline";
    case "pending":
      return "secondary";
    default:
      return "secondary";
  }
}

// Date formatting
export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(time: string) {
  return time.slice(0, 5);
}

export function formatDateTime(dateTimeString: string) {
  const date = new Date(dateTimeString);
  return date.toLocaleString("id-ID");
}
