import React, { useState } from 'react';
import { useKanbanStore, type ColumnId } from '../store/kanbanStore';
import Column from './Column';

const columnTitles: Record<ColumnId, string> = {
  todo: 'To Do',
  inProgress: 'In Progress',
  done: 'Done',
};

const orderedColumns: ColumnId[] = ['todo', 'inProgress', 'done'];

export const KanbanBoard: React.FC = () => {
  const tasks = useKanbanStore((state) => state.tasks);
  const addTask = useKanbanStore((state) => state.addTask);
  const moveTask = useKanbanStore((state) => state.moveTask);
  const deleteTask = useKanbanStore((state) => state.deleteTask);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const selectedTask = selectedTaskId
    ? tasks.find((task) => task.id === selectedTaskId) ?? null
    : null;

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = newTitle.trim();
    const trimmedDescription = newDescription.trim();

    if (!trimmedTitle) return;

    addTask('todo', trimmedTitle, trimmedDescription || undefined);
    setNewTitle('');
    setNewDescription('');
    setIsCreateOpen(false);
  };

  const handleSelectTask = (taskId: string) => {
    setSelectedTaskId(taskId);
  };

  const handleCloseDetails = () => {
    setSelectedTaskId(null);
  };

  return (
    <div className="kanban-layout">
      <div className="kanban-main">
        <div className="kanban-top-bar">
          <button
            type="button"
            className="create-task-button"
            onClick={() => setIsCreateOpen((prev) => !prev)}
          >
            + Новая задача
          </button>
          {isCreateOpen && (
            <form className="create-task-form" onSubmit={handleCreateSubmit}>
              <input
                type="text"
                placeholder="Название задачи"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <textarea
                placeholder="Описание задачи (необязательно)"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                rows={3}
              />
              <button type="submit">Создать</button>
            </form>
          )}
        </div>

        <div className="kanban-board">
          {orderedColumns.map((columnId) => (
            <Column
              key={columnId}
              id={columnId}
              title={columnTitles[columnId]}
              tasks={tasks.filter((task) => task.columnId === columnId)}
              onMoveTask={moveTask}
              onDeleteTask={deleteTask}
              onSelectTask={handleSelectTask}
            />
          ))}
        </div>
      </div>

      <aside
        className={`task-detail ${
          selectedTask ? 'task-detail--visible' : ''
        }`}
      >
        {selectedTask ? (
          <div className="task-detail__content">
            <div className="task-detail__header">
              <h2>{selectedTask.title}</h2>
              <button
                type="button"
                className="task-detail__close"
                onClick={handleCloseDetails}
              >
                ✕
              </button>
            </div>

            {selectedTask.description && (
              <p className="task-detail__description">
                {selectedTask.description}
              </p>
            )}

            <div className="task-detail__status">
              Статус: <span>{columnTitles[selectedTask.columnId]}</span>
            </div>

            <div className="task-detail__actions">
              {orderedColumns.map((columnId) => (
                <button
                  key={columnId}
                  type="button"
                  disabled={selectedTask.columnId === columnId}
                  onClick={() => moveTask(selectedTask.id, columnId)}
                >
                  {columnTitles[columnId]}
                </button>
              ))}
              <button
                type="button"
                className="task-detail__trash"
                onClick={() => {
                  deleteTask(selectedTask.id);
                  handleCloseDetails();
                }}
              >
                В треш
              </button>
            </div>
          </div>
        ) : (
          <div className="task-detail__empty">
            Выберите задачу, чтобы увидеть детали
          </div>
        )}
      </aside>
    </div>
  );
};

export default KanbanBoard;

