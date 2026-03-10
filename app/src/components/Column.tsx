import React from 'react';
import type { ColumnId, Task } from '../store/kanbanStore';
import TaskCard from './TaskCard';

interface ColumnProps {
  id: ColumnId;
  title: string;
  tasks: Task[];
  onMoveTask: (taskId: string, to: ColumnId) => void;
  onDeleteTask: (taskId: string) => void;
  onSelectTask: (taskId: string) => void;
}

export const Column: React.FC<ColumnProps> = ({
  id,
  title,
  tasks,
  onMoveTask,
  onDeleteTask,
  onSelectTask,
}) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      onMoveTask(taskId, id);
    }
  };

  return (
    <div className="kanban-column">
      <h2 className="kanban-column__title">{title}</h2>

      <div
        className="kanban-column__tasks"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onMove={onMoveTask}
            onDelete={onDeleteTask}
            onSelect={onSelectTask}
          />
        ))}
        {tasks.length === 0 && (
          <div className="kanban-column__empty">Пока нет задач</div>
        )}
      </div>
    </div>
  );
};

export default Column;

