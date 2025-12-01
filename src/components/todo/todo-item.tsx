import type { TodoType } from "./types";
import { ListGroupItem, Badge, Button } from "react-bootstrap";

const TodoItem = ({ todo, removeTodo }: { todo: TodoType, removeTodo: (id: string) => void }) => {
    const handleDelete = () => {
        removeTodo(todo.id);
    }
    
    return (
        <ListGroupItem 
            className="d-flex align-items-center gap-3 py-3 border-start-0 border-end-0"
            style={{ 
                backgroundColor: 'rgba(224, 170, 255, 0.1)',
                borderLeft: '3px solid #9D4EDD',
                transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(157, 78, 221, 0.15)';
                e.currentTarget.style.transform = 'translateX(5px)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(224, 170, 255, 0.1)';
                e.currentTarget.style.transform = 'translateX(0)';
            }}
        >
            <Badge 
                bg={todo.done ? "success" : "warning"} 
                className="px-3 py-2"
                style={{ minWidth: '110px', fontSize: '0.8rem', fontWeight: '600' }}
            >
                {todo.done ? "Completado" : "Pendiente"}
            </Badge>
            
            <div className="flex-grow-1">
                <div className="fw-semibold mb-1 fs-6" style={{ color: '#240046' }}>{todo.content}</div>
                <div className="d-flex gap-3 flex-wrap">
                    <small style={{ color: '#7B2CBF' }}>
                        <strong>Creado:</strong> {todo.createdAt}
                    </small>
                    <small className="d-none d-md-inline" style={{ color: '#7B2CBF' }}>
                        <strong>Actualizado:</strong> {todo.updatedAt}
                    </small>
                </div>
            </div>
            
            <Button 
                variant="outline-danger" 
                size="sm"
                onClick={handleDelete}
                className="ms-auto"
            >
                Eliminar
            </Button>
        </ListGroupItem>
    );
}
 
export default TodoItem;