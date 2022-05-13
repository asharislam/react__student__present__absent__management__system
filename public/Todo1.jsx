import { useState } from "react";

const Todo = function(){
    const [todoTitle, setTodoTitle] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [isEditable, setIsEditable] = useState(false);
    const [editableTodo, setEditableTodo] =useState(null);
    const createHandler = function(event){
        event.preventDefault(event);
        const newTodo = {
            title: todoTitle,
            id: Date.now(),
        }
        if(!todoTitle){
            alert("Enter Todo First")
        }else{
            setTodoList([newTodo, ...todoList])
            setTodoTitle("");
        }
    }
    

    const editHandler = function(id){
        const toBeEditatedTodo = todoList.find(todo=>todo.id===id);
        setIsEditable(true);
        setEditableTodo(toBeEditatedTodo);
        setTodoTitle(toBeEditatedTodo.title);

    }
    const updateHandler = function(event){
        event.preventDefault();
        
        editableTodo.title = todoTitle || editableTodo.title;
        if(!todoTitle){
            alert("ager tae ache")
        }else{
            editableTodo.title = editableTodo.title;
        }
        setTodoTitle("");
        setIsEditable(false);
        setEditableTodo(null);

    }
    const deleteHandler = function(id){
        const toBeDeletedTodo = todoList.filter(todo=>todo.id !== id);
        setTodoList(toBeDeletedTodo);
    }
    return(
        <div className="container">
            <h2>Hello World</h2>
            <form>
                <input value={todoTitle} type="text" onChange={(event)=>setTodoTitle(event.target.value)} name="" placeholder="Enter Todo" />
                <button onClick={(event)=>isEditable===true?updateHandler(event):createHandler(event)}>
                    {isEditable===true?"Update Todo":"Add Todo"}
                </button>
                
            </form>
            <div className="container__List__item">
                <ol>
                    {todoList.map(todo=>(
                        <li key={todo.id}>
                            <span>{todo.title+" "}</span>
                            <button onClick={(event)=>editHandler(todo.id)}>Edit</button>
                            <button onClick={(event)=>deleteHandler(todo.id)}>Delete</button>
                            
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}
export default Todo;