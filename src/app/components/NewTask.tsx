import { useState } from "react"; 

interface NewTaskProps {
  onAddTask: (title: string, category: string, date: Date) => void;
}

export default function NewTask({ onAddTask }: NewTaskProps) {
  const [title, setTitle] = useState<string>(""); 
  const [category, setCategory] = useState<string>(""); 
  const [date, setDate] = useState<Date | null>(null); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the page from refreshing on form submit
    if (title && category && date) {
      onAddTask(title, category, date); 
      setTitle(""); // Clear the form after submission
      setCategory(""); 
      setDate(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field is-grouped"> 
        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="control">
          <input
            className="input"
            type="date"
            value={date ? date.toISOString().split("T")[0] : ""}
            onChange={(e) => setDate(new Date(e.target.value))}
          />
        </div>

        <div className="control">
          <button className="button is-purple" type="submit">
            Add New Task
          </button>
        </div>
      </div>
    </form>
  );
}
