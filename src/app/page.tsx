"use client";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import NewTask from "./components/NewTask";
import ToDo from "./components/ToDo";
import Filter from "./components/Filter";
import { Todos } from "./types";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [toDo, setToDo] = useState<Todos[]>([]);
  const [filteredToDos, setFilteredToDos] = useState<Todos[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [showCompleted, setShowCompleted] = useState<boolean>(true);

  const hardcodedToDos: Todos[] = [
    {
      id: uuidv4(),
      position: 1,
      title: "Complete project proposal",
      category: "Work",
      date: new Date("2024-10-10"),
      status: false,
    },
    {
      id: uuidv4(),
      position: 2,
      title: "Grocery shopping",
      category: "Personal",
      date: new Date("2024-10-11"),
      status: false,
    },
    {
      id: uuidv4(),
      position: 3,
      title: "Schedule dentist appointment",
      category: "Personal",
      date: new Date("2024-10-12"),
      status: false,
    },
    {
      id: uuidv4(),
      position: 4,
      title: "Plan weekend trip",
      category: "Personal",
      date: new Date("2024-10-13"),
      status: false,
    },
    {
      id: uuidv4(),
      position: 5,
      title: "Team meeting preparation",
      category: "Work",
      date: new Date("2024-10-14"),
      status: false,
    },
    {
      id: uuidv4(),
      position: 6,
      title: "Renew car insurance",
      category: "Personal",
      date: new Date("2024-10-15"),
      status: false,
    },
    {
      id: uuidv4(),
      position: 7,
      title: "Finish reading book",
      category: "Personal",
      date: new Date("2024-10-16"),
      status: false,
    },
    {
      id: uuidv4(),
      position: 8,
      title: "Prepare tax documents",
      category: "Work",
      date: new Date("2024-10-17"),
      status: false,
    },
    {
      id: uuidv4(),
      position: 9,
      title: "Book flight tickets",
      category: "Personal",
      date: new Date("2024-10-18"),
      status: false,
    },
    {
      id: uuidv4(),
      position: 10,
      title: "Organize workspace",
      category: "Personal",
      date: new Date("2024-10-19"),
      status: false,
    },
  ];

  const addTask = (title: string, category: string, date: Date) => {
    const newTask: Todos = {
      id: uuidv4(),
      position: toDo.length + 1,
      title,
      category,
      date,
      status: false,
    };

    const updatedToDo = [...toDo, newTask];
    setToDo(updatedToDo);
    window.localStorage.setItem("natashaToDos", JSON.stringify(updatedToDo));
    applyFilter(filter, updatedToDo);
  };

  const saveTask = (updatedTask: Todos) => {
    const updatedToDo = toDo.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setToDo(updatedToDo);
    window.localStorage.setItem("natashaToDos", JSON.stringify(updatedToDo));
    applyFilter(filter, updatedToDo);
  };

  const deleteTask = (id: string) => {
    const updatedToDo = toDo.filter((task) => task.id !== id);
    setToDo(updatedToDo);
    window.localStorage.setItem("natashaToDos", JSON.stringify(updatedToDo));
    applyFilter(filter, updatedToDo);
  };

  const toggleTaskStatus = (id: string) => {
    const updatedToDo = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });

    setToDo(updatedToDo);
    window.localStorage.setItem("natashaToDos", JSON.stringify(updatedToDo));
    applyFilter(filter, updatedToDo);
  };

  const toggleShowCompleted = () => {
    setShowCompleted((prev) => !prev);
  };

  const getToDos = () => {
    const storedToDos = window.localStorage.getItem("natashaToDos");
    const toDos: Todos[] = storedToDos ? JSON.parse(storedToDos) : [];
    setToDo(toDos);
    setFilteredToDos(toDos);
  };

  const applyFilter = (filter: string, todos: Todos[] = toDo) => {
    const now = new Date();

    let filtered = todos;

    if (filter === "weekly") {
      filtered = todos.filter((task) => {
        const dueDate = new Date(task.date);
        const timeDiff = dueDate.getTime() - now.getTime();
        return timeDiff >= 0 && timeDiff <= 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
      });
    } else if (filter === "monthly") {
      filtered = todos.filter((task) => {
        const dueDate = new Date(task.date);
        const timeDiff = dueDate.getTime() - now.getTime();
        return timeDiff >= 0 && timeDiff <= 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
      });
    }
    if (!showCompleted) {
      filtered = filtered.filter((task) => !task.status);
    }

    setFilteredToDos(filtered);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    applyFilter(newFilter);
  };

  const moveTask = (dragPosition: number, hoverPosition: number) => {
    const updatedToDo = [...toDo];

    const draggedTaskIndex = updatedToDo.findIndex(
      (task) => task.position === dragPosition
    );
    const hoverTaskIndex = updatedToDo.findIndex(
      (task) => task.position === hoverPosition
    );

    // If the dragged task is being moved downward
    if (draggedTaskIndex < hoverTaskIndex) {
      const [draggedTask] = updatedToDo.splice(draggedTaskIndex, 1); // Remove dragged task
      updatedToDo.splice(hoverTaskIndex, 0, draggedTask); // Insert it at the hover position
    }
    // If the dragged task is being moved upward
    else if (draggedTaskIndex > hoverTaskIndex) {
      const [draggedTask] = updatedToDo.splice(draggedTaskIndex, 1); // Remove dragged task
      updatedToDo.splice(hoverTaskIndex, 0, draggedTask); // Insert it at the hover position
    }

    // Update positions of all tasks to maintain correct order
    const reorderedToDo = updatedToDo.map((task, index) => ({
      ...task,
      position: index + 1, // Update the position to reflect the new order
    }));

    setToDo(reorderedToDo);
    setFilteredToDos(reorderedToDo);
    window.localStorage.setItem("natashaToDos", JSON.stringify(reorderedToDo));
  };

  useEffect(() => {
    applyFilter(filter);
  }, [showCompleted]);

  useEffect(() => {
    getToDos();
  }, []);

  useEffect(() => {
    console.log("Filtered tasks:", filteredToDos);
  }, [filteredToDos]);

  return (
    <DndProvider backend={HTML5Backend}>
      <main className="container mt-5">
        <div className="tasks-list mb-5">
          {filteredToDos.map((item) => (
            <ToDo
              key={item.id}
              toDo={item}
              onToggleStatus={toggleTaskStatus}
              onSaveTask={saveTask}
              onDeleteTask={deleteTask}
              moveTask={moveTask}
            />
          ))}
        </div>
        <div className="control has-text-centered">
          <button className="button is-link" onClick={toggleShowCompleted}>
            {showCompleted ? "Hide Completed Tasks" : "Show Completed Tasks"}
          </button>
        </div>
        <hr />
        <NewTask onAddTask={addTask} />
        <hr />
        <Filter onFilterChange={handleFilterChange} />
      </main>
    </DndProvider>
  );
}
