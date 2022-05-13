import { useState } from "react";

const NewTodo = function(){
    const[todoTitle, setTodoTitle] = useState("");
    const[todoList, setTodoList] = useState([]);
    const[isEditable, setIsEditable] = useState(false);
    const[editableTodo, setEditableTodo] = useState(null);
    const addTodoHandler = function(event){
        event.preventDefault();
        if(!todoTitle){
            alert("Enter Todo");
        }else{
            const newTodo ={
                title: todoTitle,
                id: Date.now()
            }
            setTodoList([...todoList, newTodo]);
            setTodoTitle("");
        }
    }
    const editHandler = function(id){
        const toBeEditableTodo = todoList.find(todo=>todo.id === id);
        setIsEditable(true);
        setEditableTodo(toBeEditableTodo);
        setTodoTitle(toBeEditableTodo.title);

    }
    const updateTodoHandler = function(event){
        event.preventDefault();
        editableTodo.title = todoTitle || editableTodo.title;
        setTodoTitle("");
        setIsEditable(false);
        setEditableTodo(null);
    }
    const deleteHandler = function(id){
        const toBeDeletableTodo = todoList.filter(todo=>todo.id !== id);
        setTodoList(toBeDeletableTodo);
    }
    const presentHandler = function(id){
        const todo = todoList.find(todo=>todo.id === id);
        if(todo?.isPresent === undefined){
            todo.isPresent = true;
            setTodoList([...todoList]);
        }else if(todo?.isPresent === true){
            alert("Already in Present List");
        }else{
            alert("Already in Absent List")
        }

    }
    const absentHandler = function(id){
        const todo = todoList.find(todo=>todo.id === id);
        if(todo?.isPresent === undefined){
            todo.isPresent = false;
            setTodoList([...todoList]);
        }else if(todo?.isPresent === false){
            alert("Already in Absent List");
        }else{
            alert("Already in Present List")
        }
        

    }
    const accidentHandler = function(id){
        const todo = todoList.find(todo=>todo.id === id);
        todo.isPresent = !todo.isPresent;
        setTodoList([...todoList]);
    }
    
    return(
        <div className="container">
            <h2>New Todo</h2>
            <form action="">
                <input value={todoTitle} type="text" onChange={(event)=>setTodoTitle(event.target.value)} name="" id="" placeholder="Enter Todo" />
                <button onClick={(event)=>isEditable?updateTodoHandler(event):addTodoHandler(event)}>
                    {isEditable?"Update Todo":"Add Todo"}
                </button>
            </form>
            <div className="todoItemList">

                <div className="all__Todo">
                    <h3>All Todo</h3>
                    <ol>
                        {todoList.map(todo=>(
                            <li key = {todo.id}>
                                <span>{todo.title + " "}</span>
                                <button onClick={(event)=>editHandler(todo.id)}>Edit</button>
                                <button onClick={(event)=>deleteHandler(todo.id)}>Delete</button>
                                <button onClick={(event)=>presentHandler(todo.id)}>Present</button>
                                <button onClick={(event)=>absentHandler(todo.id)}>Absent</button>
                                
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="present__Todo">
                    <h3>Present Todo</h3>
                    <ol>
                        {todoList.filter(item=>item?.isPresent === true).map(todo=>(
                            <li key = {todo.id}>
                                <span>{todo.title}</span>
                                <button onClick={(event)=>accidentHandler(todo.id)}>Accidently Added</button>
                            </li>
                        ))}
                    </ol>
                </div>
                
                <div className="absent__Todo">
                    <h3>Absent Todo</h3>
                    <ol>
                        {todoList.filter(item =>item?.isPresent === false).map(todo=>(
                            <li key = {todo.id}>
                                <span>{todo.title}</span>
                                <button onClick={(event)=>accidentHandler(todo.id)}>Accidently Added</button>
                            </li>
                        ))}
                    </ol>
                </div>
                
            </div>
        </div>
    )
}
export default NewTodo;