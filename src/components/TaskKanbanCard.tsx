import {
  Calendar,
  Flag,
  MessageCircle,
  MoreHorizontal,
  Paperclip,
} from "lucide-react";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  assignee: { name: string; avatar: string };
  dueDate: string;
  tags: string[];
  comments: number;
  attachments: number;
}

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-700";
    case "medium":
      return "bg-yellow-100 text-yellow-700";
    case "low":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "border-l-red-500 bg-red-50 dark:bg-red-400/20";
    case "medium":
      return "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-400/20";
    case "low":
      return "border-l-green-500 bg-green-50 dark:bg-green-400/20";
    default:
      return "border-l-gray-500 bg-gray-50 dark:bg-gray-400/20";
  }
};

interface TaskCardProps {
  task: Task;
}

export default function TaskKanbanCard({ task }: TaskCardProps) {
  return (
    <div
      className={`bg-background rounded-lg p-4 mb-3 shadow-sm border-l-4 hover:shadow-md transition-shadow ${getPriorityColor(
        task.priority
      )}`}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-sm leading-tight">{task.title}</h4>
        <button className="text-gray-400 hover:text-gray-600 p-1">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <p className=" text-xs mb-3 line-clamp-2">{task.description}</p>

      <div className="flex flex-wrap gap-1 mb-3">
        {task.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">
              {task.assignee.avatar}
            </div>
            <span className="text-xs ">{task.assignee.name}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {task.comments > 0 && (
            <div className="flex items-center space-x-1 text-muted-foreground">
              <MessageCircle className="h-3 w-3" />
              <span className="text-xs">{task.comments}</span>
            </div>
          )}
          {task.attachments > 0 && (
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Paperclip className="h-3 w-3" />
              <span className="text-xs">{task.attachments}</span>
            </div>
          )}
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span className="text-xs">{task.dueDate}</span>
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadge(
            task.priority
          )}`}
        >
          {task.priority} priority
        </span>
        <Flag
          className={`h-3 w-3 ${
            task.priority === "high"
              ? "text-red-500"
              : task.priority === "medium"
              ? "text-yellow-500"
              : "text-green-500"
          }`}
        />
      </div>
    </div>
  );
}
