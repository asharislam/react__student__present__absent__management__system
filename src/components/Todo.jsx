import { useState } from "react";

const Todo = function () {
    const [todoTitle, setTodoTitle] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [isEditable, setIsEditable] = useState(false);
    const [editableTodo, setEditableTodo] = useState(null);
    const createHandler = function (event) {
        event.preventDefault(event);
        const newTodo = {
            title: todoTitle,
            id: Date.now(),
        };
        if (!todoTitle) {
            alert("Enter Todo First");
        } else {
            setTodoList([newTodo, ...todoList]);
            setTodoTitle("");
        }
    };

    const editHandler = function (id) {
        const toBeEditatedTodo = todoList.find((todo) => todo.id === id);
        setIsEditable(true);
        setEditableTodo(toBeEditatedTodo);
        setTodoTitle(toBeEditatedTodo.title);
    };
    const updateHandler = function (event) {
        event.preventDefault();

        editableTodo.title = todoTitle || editableTodo.title;
        if (!todoTitle) {
            alert("ager tae ache");
        } else {
            editableTodo.title = editableTodo.title;
        }
        setTodoTitle("");
        setIsEditable(false);
        setEditableTodo(null);
    };
    const deleteHandler = function (id) {
        const toBeDeletedTodo = todoList.filter((todo) => todo.id !== id);
        setTodoList(toBeDeletedTodo);
    };
    const presentHandler = (id)=>{
        const test = [...todoList];
        const todo = todoList.find((todo)=>todo.id === id);
        if(todo?.isPresent ===undefined){
            todo.isPresent =true;
            setTodoList(test)
        }else if (todo?.isPresent === true){
            alert("The Todo is alreadu in the present List")
        }else{
            alert("The Todo is Already in the Absent List")
        }
    }
    const absentHandler = (id)=>{
        const test =[...todoList];
        const todo = todoList.find((todo)=>todo.id ===id);
        if (todo?.isPresent === undefined){
            todo.isPresent = false;
            setTodoList(test)
        }else if(todo?.isPresent ===false){
            alert("The Todo is already in the Absent List")
        }else{
            alert("The Todo is Already in the Present List")
        }
    }
    const accidentHandler =(id)=>{
        const test = [...todoList];
        const todo = todoList.find((todo)=>todo.id === id);
        todo.isPresent = !todo.isPresent
        setTodoList(test);
    }
    return (
        <div className='container'>
            <h2>Hello World</h2>
            <form>
                <input
                    value={todoTitle}
                    type='text'
                    onChange={(event) => setTodoTitle(event.target.value)}
                    name=''
                    placeholder='Enter Todo'
                />
                <button
                    onClick={(event) =>
                        isEditable === true
                            ? updateHandler(event)
                            : createHandler(event)
                    }
                >
                    {isEditable === true ? "Update Todo" : "Add Todo"}
                </button>
            </form>
            <div className='container__List__item'>

                <div className="container__all__todo">
                    <h3>All Todo</h3>
                    <ol>
                    {todoList.map((todo) => (
                        <li key={todo.id}>
                            <span>{todo.title + " "}</span>
                            <button onClick={(event) => editHandler(todo.id)}>
                                Edit
                            </button>
                            <button onClick={(event) => deleteHandler(todo.id)}>
                                Delete
                            </button>
                            <button onClick={(event) => presentHandler(todo.id)} > Present </button>
                            <button onClick={(event) => absentHandler(todo.id)} > Absent </button>
                        </li>
                    ))}
                </ol>
                </div>

                <div className="container__present__todo">
                    <h3>Present Todo</h3>
                    <ol>
                        {todoList.filter(item=>{
                            return item?.isPresent ===true
                        }).map(todo=>(
                            <li key={todo.id}>
                                <span>{todo.title}</span>
                                <button onClick={(event)=>accidentHandler(todo.id)}>Accidentally Added</button>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="container__absent__todo">
                    <h3>Absent Todo</h3>
                    <ol>
                        {todoList.filter((item)=>item?.isPresent === false).map(todo=>(
                            <li key={todo.id}>
                                <span>{todo.title}</span>
                                <button onClick={(event)=>accidentHandler(todo.id)}>Accidentally Added</button>

                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
};
export default Todo;
