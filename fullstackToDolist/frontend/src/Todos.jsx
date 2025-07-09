import { useTodo } from "./Context/TodoContext";
import Todo from "./Todo";

export default function Todos(){
    let {todo,title,handleChangeTitle,addTodo}=useTodo();
    return(
        <div className="todos">
           <div className="container" style={{maxHeight:"400px",overflow:"auto"}}>
             {
                todo && todo.length>0?(
                    todo.map((e)=>{
                    return(
                        <Todo key={e.id} id={e.id} title={e.title} description={e.description} completed={e.completed} />
                    );
                })
                ):(
                    <p style={{fontSize:"50px",textTransform:"capitalize"}}>enter your first task</p>
                )
            }
           </div>
            <input value={title} onChange={(e)=>{handleChangeTitle(e.target.value)}} type="text" style={{padding:"0.5rem",margin:"1rem"}}></input>
            <button onClick={addTodo}>add</button>
        </div>
    );
}