import {Todos} from '../types'

interface ToDoProps {
    toDo: Todos; // or whatever the correct type is
  }

const ToDo = ({toDo}: ToDoProps) => {
    const {id, title, position, date, category, status} = toDo;

    return (
        <>
            <h1 className='has-text-link-light'>{title}</h1>
        </>
    );
}

export default ToDo;