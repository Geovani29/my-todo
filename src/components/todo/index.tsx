import { useState } from "react";
import { Card, Form, InputGroup, Button, Spinner, ListGroup } from "react-bootstrap";
import { useTodo } from "./useTodo";
import TodoItem from "./todo-item";

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
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                <div className="text-center" style={{ color: '#E0AAFF' }}>
                    <Spinner animation="border" className="mb-3" style={{ color: '#C77DFF' }} />
                    <p className="fs-5">Cargando...</p>
                </div>
            </div>
        );
    }

    return (
        <Card className="shadow-lg border-0" style={{ maxWidth: '900px', margin: '0 auto', backgroundColor: 'rgba(255, 255, 255, 0.98)' }}>
            <Card.Body className="p-4">
                <Card.Title as="h1" className="text-center mb-4 fw-bold" style={{ background: 'linear-gradient(135deg, #5A189A 0%, #7B2CBF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    To Do List
                </Card.Title>
                
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    onClick();
                }} className="mb-4">
                    <InputGroup size="lg">
                        <Form.Control
                            type="text"
                            name="todo"
                            value={todo}
                            onChange={onChange}
                            placeholder="Ingresa una nueva tarea"
                            className="border-primary"
                        />
                        <Button 
                            type="submit" 
                            variant="primary"
                            className="px-4"
                        >
                            Agregar
                        </Button>
                    </InputGroup>
                </Form>

                {todos.length === 0 ? (
                    <div className="text-center py-5">
                        <p className="text-muted fs-5 mb-0">No hay tareas. ¡Agrega una nueva!</p>
                    </div>
                ) : (
                    <ListGroup variant="flush" className="rounded">
                        {todos.map((todo) => (
                            <TodoItem 
                                key={todo.id} 
                                todo={todo} 
                                removeTodo={removeTodo} 
                            />
                        ))}
                    </ListGroup>
                )}
            </Card.Body>
        </Card>
    )
}

export default Todo;
