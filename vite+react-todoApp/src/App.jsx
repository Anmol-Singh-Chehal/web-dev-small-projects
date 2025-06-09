import {FaEdit, FaCheck} from 'react-icons/fa'
import {AiFillDelete} from 'react-icons/ai'
import {LuListTodo} from 'react-icons/lu'
import {useState, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'

const SearchBar = (props) => {
    return (
        <input type="text" className="customSearchBar" placeholder={props.innerText} onChange={props.onChange} value={props.value}/>
    );
}

const CustomButton = (props) => {
    return (
        <button className={`customButton ${props.isActive?"bg-rose-900":"bg-light"}`} onClick={props.onClick} >
            {props.buttonText}
        </button>
    );
}

const TodoBox = (props) => {
    return (
        <div className="flex flex-col gap-2 bg-light rounded-xl p-2">
            <p className="upper-area leading-4 text-sm font-semibold text-white">{props.todoText}</p>
            <div className="bottom-area flex justify-between items-center">
                <button className="left-area min-h-[20px] min-w-[20px] rounded-md bg-dark" name={props.name} onClick={props.onTick}>{props.isFinished && <FaCheck className='iconSize'/>}</button>
                <div className='flex gap-4'>
                    <button name={props.name} onClick={props.onEdit}>{<FaEdit className='iconSize'/>}</button>
                    <button className='iconSize' name={props.name} onClick={props.onDelete}>{<AiFillDelete/>}</button>
                </div>
            </div>
        </div>
    );
}

const NavBar = () => {
    return (
        <nav className='container mx-auto flex justify-between px-4 py-2 bg-light items-center rounded-lg my-4'>
            <div className="left-area flex gap-2 items-center">
                <LuListTodo className='text-white w-8 h-8 hover:cursor-pointer'/>
                <p className='text-lg font-semibold text-white hover:underline hover:cursor-pointer'>Todo App</p>
            </div>
            <ul className="right-area flex gap-6 text-white text-md hover:cursor-pointer font-semibold items-center">
                <li className='hover:underline'>Home</li>
                <li className='hover:underline'>Your Tasks</li>
            </ul>
        </nav>
    );
}

const App = () => {
    const [todo, setTodo] = useState("");
    const [search, setSearch] = useState(""); 
    const [todos, setTodos] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const [getBy, setGetBy] = useState("all");

    useEffect(() => {
        let savedTodos = localStorage.getItem("todos");
        if (savedTodos){
            let filteredTodos = JSON.parse(savedTodos);
            setTodos(filteredTodos);
        }
    }, []);

    useEffect(() => {
        if(todos.length > 0){
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    }, [todos]);

    const handleAddTodo = () => {
        if(todo.length > 3){
            setTodos([...todos, {id:uuidv4(), text:todo, isFinished:false}]);
            setTodo("");
            console.log(todos);
        }
    }

    const handleUpdateTodo = () => {
        if(todo.length > 3){
            let index = todos.findIndex((item)=>{
                return item.id === editId;
            });
            let newTodos = [...todos];
            newTodos[index].text = todo;
            setTodos(newTodos);
            setTodo("");
        }
        setIsEdit(false);
    }

    const tickTodo = (event) => {
        let id = event.currentTarget.name;
        let index = todos.findIndex((item)=>{
            return item.id === id;
        });
        let newTodos = [...todos];
        newTodos[index].isFinished = !newTodos[index].isFinished;
        setTodos(newTodos);
    }

    const deleteTodo = (event) => {
        let id = event.currentTarget.name;
        let newTodos = todos.filter((item)=>{
            return item.id != id;
        });
        setTodos(newTodos);
    }

    const updateTodo = (event) => {
        setIsEdit(true);
        let id = event.currentTarget.name;
        let index = todos.findIndex((item)=>{
            return item.id === id;
        });
        console.log(index);
        setTodo(todos[index].text); 
        setEditId(todos[index].id);
    }

    const getByAll = () => {
        setGetBy("all");
        if(getBy === "search"){
            setSearch("");
        }
    }
    
    const getByFinished = () => {
        setGetBy("finished");
        if(getBy === "search"){
            setSearch("");
        }
    }

    const getByUnFinished = () => {
        setGetBy("unFinished");
        if(getBy === "search"){
            setSearch("");
        }
    }

    return (
        <>
            <NavBar/>
            <div className='flex flex-col gap-2 container mx-auto bg-medium rounded-lg p-2 h-[84vh]'>
                <div className="add-todo-area flex gap-2">
                    <SearchBar value={todo} onChange={(event) => {setTodo(event.target.value);}} innerText="Enter Todo"/>
                    <CustomButton buttonText={isEdit?"Update Todo":"Add Todo"} onClick={isEdit?handleUpdateTodo:handleAddTodo}/>
                </div>

                <div className="search-todo-area flex gap-2">
                    <SearchBar innerText="Search Todo" value={search} onChange={(event)=>{setSearch(event.target.value); setGetBy("search")}}/>
                    <CustomButton buttonText="Search"/>
                </div>

                <div className="buttons-area flex gap-3 my-2">
                    <CustomButton buttonText="All" isActive={(getBy == "all")?true:false} onClick={getByAll}/>
                    <CustomButton buttonText="Finished" isActive={(getBy == "finished")?true:false} onClick={getByFinished}/>
                    <CustomButton buttonText="Unfinished" isActive={(getBy == "unFinished")?true:false} onClick={getByUnFinished}/>
                </div>

                <div className="todo-show-area flex flex-col gap-2 max-h-full overflow-hidden overflow-y-auto no-scrollbar">
                    {todos.map((item)=>{
                        return ((getBy==="all") || (getBy==="finished" && item.isFinished) || (getBy==="unFinished" && !item.isFinished) || (getBy==="search" && item.text.includes(search))) && <div key={item.id}><TodoBox name={item.id} isFinished={item.isFinished} todoText={item.text} onTick={tickTodo} onDelete={deleteTodo} onEdit={updateTodo}/></div>
                    })}
                </div>
            </div>
        </>
    );
}

export default App