import { useTodo } from "./Context/TodoContext";
import Loader from "./Loader";

export default function Todo({id,title,desription,completed}){
  let {deleteTodo,updateTodo,updateComplete,loader}=useTodo();
    return(
       <div>

        {
          loader?<Loader/>:(
             <div className="todo" style={{background:"black",padding:"1rem",borderRadius:"1rem",display:"flex",justifyContent:"center",alignItems:"center",gap:"3rem",margin:"1rem"}}>
              <div className="info" style={{padding:"2rem"}}>
                <h2>{title}</h2>
                <p>{desription}</p>
              </div>
              <div className="btn" style={{display:"flex",gap:"1rem"}}>
                     <button style={{background:completed?"green":""}} onClick={()=>{
                      updateComplete(id,completed);
                     }}>{completed?"complete":"uncomplete"}</button>
                     <button onClick={()=>{deleteTodo(id)}}>delete</button>
                     <button onClick={()=>{
                      const newTitle = prompt("Enter new title:");
                     updateTodo(id,newTitle);
                     }}>update</button>
              </div>
        </div> 
          )
        }
       </div>
    );
}