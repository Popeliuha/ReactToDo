import { useState, useRef } from 'react';
import { Todos } from '../types';
import { useDrag, useDrop } from 'react-dnd';

interface ToDoProps {
  toDo: Todos;
  onToggleStatus: (id: string) => void;
  onSaveTask: (updatedTask: Todos) => void;
  onDeleteTask: (id: string) => void;
  moveTask: (dragPosition: number, hoverPosition: number) => void;
}

const ToDo = ({ toDo, onToggleStatus, onSaveTask, onDeleteTask, moveTask }: ToDoProps) => {
  const { id, title, position, category, date, status } = toDo;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(title);
  const [editedCategory, setEditedCategory] = useState<string>(category);
  const [editedDate, setEditedDate] = useState<Date>(new Date(date));

  const handleSave = () => {
    const updatedTask = {
      ...toDo,
      title: editedTitle,
      category: editedCategory,
      date: editedDate,
    };
    onSaveTask(updatedTask);
    setIsEditing(false);
  };

  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { position },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'TASK',
    hover: (item: { position: number }) => {
      if (item.position !== position) {
        console.log(`Hovering task: Moving task from ${item.position} to ${position}`);
        moveTask(item.position, position);
        item.position = position;
      }
    },
    drop: () => {
      console.log(`Dropped task at position ${position}`);
    }
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className="card mb-2"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="card-content">
        <div className="content is-flex is-align-items-center is-justify-content-space-between">
          <div className="is-flex is-align-items-center">
            <input
              type="checkbox"
              checked={status}
              onChange={() => onToggleStatus(id)}
              className="mr-2"
            />

            <strong className={`task-title ${status ? 'completed' : ''}`}>
              {title} | {category}
            </strong>
          </div>

          <div className="is-flex is-align-items-center">
            <small className="mr-3">Due: {new Date(date).toLocaleDateString()}</small>

            <button className="button is-link is-small mr-2" onClick={() => setIsEditing(true)}>
              Edit
            </button>

            <button className="button is-bordo is-small" onClick={() => onDeleteTask(id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
