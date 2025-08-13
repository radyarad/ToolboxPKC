import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

interface TypeBadgeProps {
  type: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusConfig = {
    confirmed: {
      color:
        "bg-green-100 text-green-800 border-green-200 dark:bg-green-300/20 dark:border-green-500/20 dark:text-green-500",
      label: "Confirmed",
    },
    tentative: {
      color:
        "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-300/20 dark:border-yellow-500/20 dark:text-yellow-500",
      label: "Tentative",
    },
    cancelled: {
      color:
        "bg-red-100 text-red-800 border-red-200 dark:bg-red-300/20 dark:border-red-500/20 dark:text-red-500",
      label: "Cancelled",
    },
  };

  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.confirmed;

  return <Badge className={`${config.color} border`}>{config.label}</Badge>;
};

export const TypeBadge = ({ type }: TypeBadgeProps) => {
  const typeConfig = {
    recurring: {
      color:
        "bg-blue-100 text-blue-800 dark:bg-blue-300/20 dark:border-blue-500/20 dark:text-blue-500",
      label: "Recurring",
    },
    important: {
      color:
        "bg-purple-100 text-purple-800 dark:bg-purple-300/20 dark:border-purple-500/20 dark:text-purple-500",
      label: "Important",
    },
    event: {
      color:
        "bg-orange-100 text-orange-800 dark:bg-orange-300/20 dark:border-orange-500/20 dark:text-orange-500",
      label: "Event",
    },
    technical: {
      color:
        "bg-gray-100 text-gray-800 dark:bg-gray-300/20 dark:border-gray-500/20 dark:text-gray-500",
      label: "Technical",
    },
  };

  const config = typeConfig[type as keyof typeof typeConfig] || {
    color: "bg-gray-100 text-gray-800",
    label: type,
  };

  return (
    <Badge variant="secondary" className={config.color}>
      {config.label}
    </Badge>
  );
};

export const OnlineBadge = () => (
  <Badge
    variant="outline"
    className="bg-green-50 text-green-700 border-green-200 dark:bg-green-300/20 dark:border-green-500/20 dark:text-green-500"
  >
    Online
  </Badge>
);
