import { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Fetch tasks from API
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:3000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={16} className="text-green-500" />;
      case "in-progress":
        return <Clock size={16} className="text-blue-500" />;
      case "pending":
        return <AlertCircle size={16} className="text-yellow-500" />;
      default:
        return <AlertCircle size={16} className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center bg-gray-50 min-h-screen">
        <div className="border-t-2 border-b-2 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-4 md:p-8 min-h-screen">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-bold text-gray-800 text-2xl">My Tasks</h1>
          <p className="text-gray-600">Manage your tasks</p>
        </div>

        {/* Controls */}
        <div className="flex sm:flex-row flex-col gap-4 bg-white shadow-sm mb-6 p-4 rounded-lg">
          <div className="relative flex-1">
            <div className="left-0 absolute inset-y-0 flex items-center pl-3">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-2 pr-4 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
            />
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white"
          >
            <Plus size={18} />
            <span>Add Task</span>
          </button>
        </div>

        {/* Tasks List */}
        {tasks.length === 0 ? (
          <div className="bg-white shadow-sm p-8 rounded-lg text-center">
            <div className="mb-4 text-gray-400">
              <AlertCircle size={48} className="mx-auto" />
            </div>
            <h3 className="mb-2 font-medium text-gray-700 text-xl">
              No tasks yet
            </h3>
            <p className="mb-4 text-gray-500">
              Get started by creating your first task
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 mx-auto px-4 py-2 rounded-lg text-white"
            >
              <Plus size={18} />
              <span>Create Task</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks
              .filter(
                (task) =>
                  task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  task.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
              )
              .map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onUpdate={fetchTasks}
                  statusIcon={getStatusIcon(task.status)}
                  statusColor={getStatusColor(task.status)}
                />
              ))}
          </div>
        )}
      </div>

      {/* Create Task Modal */}
      {showCreateModal && (
        <CreateTaskModal
          onClose={() => setShowCreateModal(false)}
          onTaskCreated={fetchTasks}
        />
      )}
    </div>
  );
};

// Task Card Component
const TaskCard = ({ task, onUpdate, statusIcon, statusColor }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${task._id}`);
      onUpdate();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await axios.patch(`http://localhost:3000/tasks/${task._id}`, {
        status: newStatus,
      });
      onUpdate();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="bg-white shadow-sm hover:shadow-md p-4 rounded-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800 text-lg">{task.name}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-blue-500 transition-colors"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <p className="mb-3 text-gray-600 text-sm">{task.description}</p>

      <div className="flex justify-between items-center">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor} flex items-center gap-1`}
        >
          {statusIcon}
          {task.status.replace("-", " ")}
        </span>

        <div className="flex gap-1">
          {task.status !== "completed" && (
            <button
              onClick={() => handleStatusChange("completed")}
              className="bg-green-100 hover:bg-green-200 px-2 py-1 rounded text-green-800 text-xs"
            >
              Complete
            </button>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <EditTaskModal
          task={task}
          onClose={() => setIsEditing(false)}
          onTaskUpdated={onUpdate}
        />
      )}
    </div>
  );
};

// Create Task Modal Component
const CreateTaskModal = ({ onClose, onTaskCreated }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post("http://localhost:3000/tasks", {
        name,
        description,
        status: "pending",
      });
      onTaskCreated();
      onClose();
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md">
        <div className="p-6">
          <h2 className="mb-4 font-bold text-gray-800 text-xl">
            Create New Task
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Task Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                placeholder="Enter task name"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows="3"
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                placeholder="Enter task description"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 font-medium text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-500 hover:bg-blue-600 disabled:opacity-70 px-4 py-2 rounded-lg font-medium text-white"
              >
                {isLoading ? "Creating..." : "Create Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Edit Task Modal Component
const EditTaskModal = ({ task, onClose, onTaskUpdated }) => {
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.patch(`http://localhost:3000/tasks/${task._id}`, {
        name,
        description,
      });
      onTaskUpdated();
      onClose();
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md">
        <div className="p-6">
          <h2 className="mb-4 font-bold text-gray-800 text-xl">Edit Task</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Task Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows="3"
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 font-medium text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-500 hover:bg-blue-600 disabled:opacity-70 px-4 py-2 rounded-lg font-medium text-white"
              >
                {isLoading ? "Updating..." : "Update Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;
