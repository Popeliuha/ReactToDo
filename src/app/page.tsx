'use client'
import Image from "next/image";
import ToDo  from "./components/ToDo"
import { useEffect, useState } from "react";
import { Todos } from "./types";

export default function Home() {

  const [toDo, setToDo] = useState<Todos[]>([]);

  const getToDos = () => {
    const storedToDos = window.localStorage.getItem("natashaToDos");
    const toDos: Todos[] = storedToDos ? JSON.parse(storedToDos) : [];
    setToDo(toDos);
  };

  useEffect(() => {
    getToDos();
  }, []); // runs once when page is rendered 

  useEffect(() => {
    console.log("Updated toDo state:", toDo);
  }, [toDo]); // logs when `toDo` state changes

  return (
    <main className="container">
      {toDo.map((item, k) => <ToDo key={k} toDo={item}/>)}
    </main>
  );
}
