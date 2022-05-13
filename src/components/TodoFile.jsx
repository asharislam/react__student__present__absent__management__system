import { useState } from "react";

const TodoFile =function(){
    

    // Add Todo Handler
    const addTodoHandler = function(e){
        e.preventDefault(e);
        if(!todoTitle){
            alert("Enter Your Todo")
        }else{
            const newTodo = {
                title: todoTitle,
                id: Date.now(),
            }
            setTodoList([...todoList, newTodo]);
        }
        setTodoTitle("");
    }
    
    
    // Edit Handler
    const editHandler = function(id){
        const toBeEditaedTodo = todoList.find(todo=>todo.id===id);
        setIsEditedTodo(true);
        setEditedTodo(toBeEditaedTodo);
        setTodoTitle(toBeEditaedTodo.title);

    }
    // Update Handler
    const updateHandler = function(e){
        e.preventDefault(e);
        editedTodo.title = todoTitle || editedTodo.title;
        if(!todoTitle){
            alert("Your Edit is Nothing")
        }else{
            editedTodo.title = editedTodo.title;
        }
        setTodoTitle("");
        setIsEditedTodo(false);
        setEditedTodo(null);
    }
    // Delete Handler
    const deleteHandler = function(id){
        const toBeDeletedTodo = todoList.filter(todo=>todo.id !==id);
        setTodoList(toBeDeletedTodo);
    }
    const [todoTitle, setTodoTitle] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [isEditedTodo, setIsEditedTodo] = useState(false);
    const [editedTodo, setEditedTodo] = useState(null);
    const [presentTodoList, setPresentTodoList] = useState([]);
    const [absentTodoList, setAbsentTodoList] = useState([]);
    // Present Todo Handler
    const presentTodoHandler = function(id){
        const todo =todoList.find(todo=>todo.id === id);
        if(todo?.isPresent === undefined){
            todo.isPresent = true;
            setTodoList([...todoList]);
        }else if(todo?.isPresent === true){
            alert("already in Present List")
        }else{
            alert("already in Absent List")
        }
        
    }
    // Absent Todo Handler
    const absentTodoHandler = function(id){
       const todo =todoList.find(todo=>todo.id === id);
       if(todo?.isPresent === undefined){
           todo.isPresent = false;
           setTodoList([...todoList]);
       } else if(todo?.isPresent === false){
           alert("Already in Absent List")
       }else{
           alert("Aready in Present list")
       }
    }


    return(
        <div className="container">
            <h2>Todo File</h2>
            <form>
                <input value={todoTitle} type="text" onChange={(e)=>setTodoTitle(e.target.value)} name="todofile" placeholder="Enter Todo" />
                <button onClick={(e)=>isEditedTodo===true?updateHandler(e): addTodoHandler(e)}>{isEditedTodo===true?"Update Todo":"Add Todo"}</button>
                
            </form>
            <div className="container__list__item">

                <div className="all__list__item">
                    <h3>All Todo</h3>
                <ol>
                    {todoList.map(todo=>(
                        <li>
                            <span>{todo.title+" "}</span>
                            <button onClick={(e)=>editHandler(todo.id)}>Edit</button>
                            <button onClick={(e)=>deleteHandler(todo.id)}>Delete</button>
                            <button onClick={(e)=>presentTodoHandler(todo.id)}>Present</button>
                            <button onClick={(e)=>absentTodoHandler(todo.id)}>Absent</button>
                        </li>
                    ))}
                </ol>
                </div>

                <div className="present__list__item">
                    <h3>Present Todo</h3>
                    <ol>
                        {todoList.filter(item=>item?.isPresent ===true).map(todo=>(
                            <li>
                                {todo.title}
                            </li>
                        ))}
                    </ol>
                    
                </div>

                <div className="present__list__item">
                    <h3>Absent Todo</h3>
                    <ol>
                        {todoList.filter(item=>item?.isPresent === false).map(todo=>(
                            <li>{todo.title}</li>
                        ))}
                    </ol>
                    
                </div>

            </div>
        </div>
    )
}
export default TodoFile;