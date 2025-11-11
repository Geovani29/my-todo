import { useState, useEffect } from "react";
import type { TodoType } from "./types";
import { todoService } from "../../services/todoService";

export const useTodo = () => {
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadTodos = async () => {
            try {
                const loadedTodos = await todoService.getAllTodos();
                setTodos(loadedTodos);
            } catch (error) {
                console.error('Error loading todos:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadTodos();
    }, []);

    const addTodo = async (content: string) => {
        const newTodo = await todoService.addTodo(content);
        if (newTodo) {
            setTodos([...todos, newTodo]);
        }
    }

    const removeTodo = async (id: string) => {
        const success = await todoService.removeTodo(id);
        if (success) {
            setTodos(todos.filter(todo => todo.id !== id));
        }
    }

    const markAsDone = async (id: string) => {
        const success = await todoService.updateTodo(id, { done: true });
        if (success) {
            setTodos(todos.map(todo => 
                todo.id === id 
                    ? { ...todo, done: true, updatedAt: new Date().toISOString() } 
                    : todo
            ));
        }
    }

    return { todos, isLoading, addTodo, removeTodo, markAsDone }
}