import { create } from 'zustand';

export type ColumnId = 'todo' | 'inProgress' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  columnId: ColumnId;
}

interface KanbanState {
  tasks: Task[];
  addTask: (columnId: ColumnId, title: string, description?: string) => void;
  moveTask: (taskId: string, toColumnId: ColumnId) => void;
  deleteTask: (taskId: string) => void;
}

const initialTasks: Task[] = [
  { id: '1', title: 'Прочитать задание', columnId: 'todo' },
  { id: '2', title: 'Сделать мини канбан', columnId: 'inProgress' },
  { id: '3', title: 'Отправить отчёт', columnId: 'done' },
];

export const useKanbanStore = create<KanbanState>((set) => ({
  tasks: initialTasks,
  addTask: (columnId, title, description) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: Date.now().toString(),
          title,
          description,
          columnId,
        },
      ],
    })),
  moveTask: (taskId, toColumnId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, columnId: toColumnId } : task
      ),
    })),
  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
}));

