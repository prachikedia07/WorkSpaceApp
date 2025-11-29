
"use client";
import { useState } from "react";
import { Plus, MoreVertical, Calendar, Users, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// ===== SAMPLE DATA =====
const initialColumns = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      {
        id: "1",
        title: "Design new landing page",
        description: "Create wireframes and mockups for the new homepage",
        priority: "high",
        assignees: ["SC", "EW"],
        dueDate: "Oct 30",
        tags: ["Design", "Marketing"],
      },
      {
        id: "2",
        title: "Update API documentation",
        description: "Document new endpoints and update examples",
        priority: "medium",
        assignees: ["JM"],
        dueDate: "Nov 2",
        tags: ["Development"],
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      {
        id: "3",
        title: "Implement authentication flow",
        description: "Add JWT authentication to the backend",
        priority: "high",
        assignees: ["MR", "JM"],
        dueDate: "Oct 28",
        tags: ["Development"],
      },
      {
        id: "4",
        title: "Q4 budget planning",
        description: "Review and allocate budget for next quarter",
        priority: "medium",
        assignees: ["SC"],
        dueDate: "Nov 5",
        tags: ["Finance"],
      },
    ],
  },
  {
    id: "review",
    title: "Review",
    tasks: [
      {
        id: "5",
        title: "Mobile app redesign",
        description: "Review new UI designs for mobile application",
        priority: "low",
        assignees: ["EW"],
        dueDate: "Oct 29",
        tags: ["Design"],
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      {
        id: "6",
        title: "Setup CI/CD pipeline",
        description: "Configure automated testing and deployment",
        priority: "high",
        assignees: ["MR"],
        dueDate: "Oct 25",
        tags: ["Development"],
      },
    ],
  },
];

// ===== PRIORITY BADGE COLORS =====
const priorityBadgeClasses = {
  low: "bg-gray-100 text-gray-600 border border-gray-200",
  medium: "bg-amber-100 text-amber-700 border border-amber-200",
  high: "bg-red-100 text-red-700 border border-red-200"
};

// ===== TASK CARD =====
function TaskCard({ task, columnId }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { task, fromColumn: columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`glass-strong p-5 rounded-xl border border-white/50 hover:shadow-lg transition-all duration-200 cursor-move ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-sm text-gray-900 font-medium">{task.title}</h4>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
        {task.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {task.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="text-xs bg-teal-50 text-teal-700 hover:bg-teal-50"
          >
            {tag}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Priority badge with correct color */}
          <span className={`px-2 py-0.5 rounded-lg text-xs font-medium capitalize ${priorityBadgeClasses[task.priority]}`}>
            {task.priority}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
            {task.dueDate}
          </div>
          <div className="flex -space-x-2">
            {task.assignees.map((a, i) => (
              <div
                key={i}
                className="w-7 h-7 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-xs text-white font-medium border-2 border-white shadow-sm"
              >
                {a}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== COLUMN COMPONENT =====
function ColumnComponent({ column, onDrop }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item) => {
      if (item.fromColumn !== column.id) {
        onDrop(item.task.id, item.fromColumn, column.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`transition-all duration-200 min-w-[320px] max-w-full flex-1 ${
        isOver ? "bg-teal-50/50" : "bg-white/40"
      } rounded-2xl p-5 backdrop-blur-sm border border-white/50`}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h3
            className="text-gray-900"
            style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}
          >
            {column.title}
          </h3>
          <Badge
            variant="secondary"
            className="text-xs bg-gray-100 text-gray-700"
          >
            {column.tasks.length}
          </Badge>
        </div>
        <button className="text-gray-400 hover:text-teal-600 transition-colors p-1 hover:bg-white/60 rounded-lg">
          <Plus className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>
      <div className="space-y-4">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} columnId={column.id} />
        ))}
      </div>
    </div>
  );
}

// ===== MAIN WORKSPACE PAGE =====
export default function WorkspacePage() {
  const [columns, setColumns] = useState(initialColumns);

  const handleDrop = (taskId, fromColumnId, toColumnId) => {
    setColumns((prev) => {
      const newCols = [...prev];
      const from = newCols.find((c) => c.id === fromColumnId);
      const to = newCols.find((c) => c.id === toColumnId);
      if (!from || !to) return prev;
      const idx = from.tasks.findIndex((t) => t.id === taskId);
      if (idx === -1) return prev;
      const [task] = from.tasks.splice(idx, 1);
      to.tasks.push(task);
      return newCols;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-10 bg-gradient-to-br from-gray-50 via-amber-50/20 to-transparent min-h-screen">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2
                className="text-3xl text-gray-900 mb-2"
                style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
              >
                Product Development
              </h2>
              <p className="text-gray-600">
                Track progress and manage team tasks
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="gap-2 glass-strong border-white/50 hover:bg-white/80 rounded-xl h-11"
              >
                <Users className="w-4 h-4" strokeWidth={1.5} /> Team
              </Button>
              <Button
                variant="outline"
                className="gap-2 glass-strong border-white/50 hover:bg-white/80 rounded-xl h-11"
              >
                <Tag className="w-4 h-4" strokeWidth={1.5} /> Filter
              </Button>
              <Button className="gap-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all h-11">
                <Plus className="w-4 h-4" strokeWidth={2} /> New Task
              </Button>
            </div>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-4 gap-5">
            {[
              ["Total Tasks", 9],
              ["In Progress", 2],
              ["Completed", 1],
              ["Team Members", 5],
            ].map(([label, num]) => (
              <div
                key={label}
                className="glass-strong rounded-2xl p-5 border border-white/50 shadow-md"
              >
                <p className="text-sm text-gray-600 mb-1">{label}</p>
                <p
                  className="text-2xl text-gray-900"
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontWeight: 700,
                  }}
                >
                  {num}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Kanban Board - wraps on small screens, min column width */}
        <div className="flex flex-wrap gap-5 w-full pb-6">
          {columns.map((col) => (
            <ColumnComponent key={col.id} column={col} onDrop={handleDrop} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

