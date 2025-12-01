import { useState } from "react";
import { useTodo } from "./useTodo";
import TodoItem from "./todo-item";
import { Button, Input } from "./styled";

function Todo() {
    const [todo, setTodo] = useState("");
    const { todos, isLoading, addTodo, removeTodo } = useTodo();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setTodo(event.target.value);

    const onClick = () => {
        if (todo.trim()) {
            addTodo(todo.trim());
            setTodo("");
        }
    }

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <span>Cargando...</span>
            </div>
        );
    }

    return (
        <>
            <h1>To do list</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                onClick();
            }}>
                <div style={{ display: 'flex', marginBottom: '2rem' }}>
                    <Input 
                        type="text" 
                        name="todo" 
                        value={todo} 
                        onChange={onChange}
                        placeholder="Enter a new task"
                    />
                    <Button type="submit">Add</Button>
                </div>
            </form>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {todos.map((todo) => (
                    <TodoItem 
                        key={todo.id} 
                        todo={todo} 
                        removeTodo={removeTodo} 
                    />
                ))}
            </ul>
        </>
    )
}

export default Todo;
