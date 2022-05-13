import { useState } from "react";

const PracTodo = function(){
    
    // Add Todo Handler
    const addTodoHandler = function(event){
        event.preventDefault();
        if(!todoTitle){
            alert("Write Todo First")
        }else{
            const newTodo = {
                title: todoTitle,
                id: Date.now(),
            }
            setTodoList([newTodo, ...todoList]);
            setTodoTitle("");
        }
    }
    
    // Edit Handler
    const editHandler = function(id){
        const toBeEditableTodo = todoList.find(todo=>todo.id===id);
        setIsEditable(true);
        setEditableTodo(toBeEditableTodo);
        setTodoTitle(toBeEditableTodo.title);

    }
    // Update Handler
    const updateHandler = function(event){
        event.preventDefault();
        
            editableTodo.title = todoTitle || editableTodo.title;
        
        
        setTodoTitle("");
        setIsEditable(false);
        setEditableTodo(null);

    }
    const deleteHandler = function(id){
        const toBeDeletedTodo = todoList.filter(todo=>todo.id !==id);
        setTodoList(toBeDeletedTodo);
    }
    const [todoTitle, setTodoTitle] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [isEditable, setIsEditable] = useState(false);
    const [editableTodo, setEditableTodo] = useState(null);
    // Present Handler
    const presentHandler = function(id){
        // const todo = todoList.find(todo=>todo.id === id);
        // if(todo?.isPresent ===undefined){
        //     todo.isPresent = true;
        //     setTodoList([...todoList]);
        // }else if(todo?.isPresent === true){
        //     alert("Already in Present List")
        // }else{
        //     alert("Already in Absent List")
        // }
        
    // Absent Handler
    const absentHandler = function(id){
        const todo = todoList.find(todo=>todo.id === id);
        if(todo?.isPresent ===undefined){
            todo.isPresent =false;
            setTodoList([...todoList]);
        }else if(todo?.isPresent === false){
            alert("Already in Absent List")
        }else{
            alert("Already in Present List")
        }
    }
    // Accidental Aded
    const accidenHandler = function(id){
        const todo = todoList.find(todo=>todo.id===id);
        todo.isPresent = !todo.isPresent
        setTodoList([...todoList]);
    }
    return(
        

        <div className="container">
            <h2>Prac Todo List</h2>
            <form>
                <input value={todoTitle} type="text" onChange={(event)=>setTodoTitle(event.target.value)} name="" placeholder="Enter Todo" />
                <button onClick={(event)=>isEditable===true?updateHandler(event):addTodoHandler(event)}>{isEditable===true?"Update Todo":"Add Todo"}</button>
            </form>
            <div className="todos__File">
                
                <div className="all__Todo">
                    <h2>All Todo</h2>
                    <ul>
                        {todoList.map(todo=>(
                            <li>
                                <span>{todo.title +" "}</span>
                                <button onClick={(event)=>editHandler(todo.id)}>Edit</button>
                                <button onClick={(event)=>deleteHandler(todo.id)}>Delete</button>
                                <button onClick={(event)=>presentHandler(todo.id)}>Present</button>
                                <button onClick={(event)=>absentHandler(todo.id)}>Absent</button>

                            </li>
                        ))}
                    </ul>
                </div>

                <div className="present__Todo">
                    <h2>Present Todo</h2>
                    
                </div>

                <div className="absent__Todo">
                    <h2>Absent Todo</h2>
                    
                </div>
            </div>
        </div>
    )
}
export default PracTodo;