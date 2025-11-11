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
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1>To do list</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                onClick();
            }}>
                <div>
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

            <ul>
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
