import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { ColumnId, Task } from '../store/kanbanStore';

interface TaskCardProps {
  task: Task;
  onMove: (taskId: string, to: ColumnId) => void;
  onDelete: (taskId: string) => void;
  onSelect: (taskId: string) => void;
}

const columnOrder: ColumnId[] = ['todo', 'inProgress', 'done'];

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onMove,
  onDelete,
  onSelect,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        cardRef.current &&
        !cardRef.current.contains(target) &&
        (!menuRef.current || !menuRef.current.contains(target))
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const currentIndex = columnOrder.indexOf(task.columnId);

  const canMoveLeft = currentIndex > 0;
  const canMoveRight = currentIndex < columnOrder.length - 1;

  const handleMoveLeft = () => {
    if (canMoveLeft) {
      onMove(task.id, columnOrder[currentIndex - 1]);
    }
  };

  const handleMoveRight = () => {
    if (canMoveRight) {
      onMove(task.id, columnOrder[currentIndex + 1]);
    }
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', task.id);
    e.dataTransfer.effectAllowed = 'move';
    setMenuOpen(false);
  };

  const handleCardClick = () => {
    setMenuOpen(false);
    onSelect(task.id);
  };

  const toggleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const menuWidth = 180;
    let left = rect.right - menuWidth;
    const top = rect.bottom + 4 + window.scrollY;

    if (left < 8) left = 8;
    const maxLeft = window.innerWidth - menuWidth - 8;
    if (left > maxLeft) left = maxLeft;

    setMenuPosition({ top, left });
    setMenuOpen((prev) => !prev);
  };

  const handleMenuClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="task-card"
      ref={cardRef}
      draggable
      onDragStart={handleDragStart}
      onClick={handleCardClick}
    >
      <div className="task-card__header">
        <div className="task-card__title">{task.title}</div>
        <button
          type="button"
          className="task-card__menu-button"
          onClick={toggleMenu}
        >
          ⋯
        </button>
      </div>
      {task.description && (
        <div className="task-card__description">{task.description}</div>
      )}
      {menuOpen && menuPosition &&
        createPortal(
          <div
            ref={menuRef}
            className="task-card__menu"
            style={{ top: menuPosition.top, left: menuPosition.left }}
            onClick={handleMenuClick}
          >
            <button
              type="button"
              disabled={!canMoveLeft}
              onClick={(e) => {
                e.stopPropagation();
                handleMoveLeft();
                setMenuOpen(false);
              }}
            >
              Двинуть влево
            </button>
            <button
              type="button"
              disabled={!canMoveRight}
              onClick={(e) => {
                e.stopPropagation();
                handleMoveRight();
                setMenuOpen(false);
              }}
            >
              Двинуть вправо
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
                setMenuOpen(false);
              }}
            >
              В треш
            </button>
          </div>,
          document.body
        )}
    </div>
  );
};

export default TaskCard;

