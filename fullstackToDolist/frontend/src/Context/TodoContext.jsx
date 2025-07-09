import { createContext, useContext, useEffect, useState } from "react";
const TodoCont=createContext();
export default function Provider({children}){
    let [todo,setTodo]=useState([]);
    let [title,setTitle]=useState("");
    let[loader,setLoader]=useState(false);
    function handleChangeTitle(title){
               setTitle(title);
    }
   

async  function addTodo(){
         try {
            setLoader(true);
            const res=await fetch("http://localhost:8080/api/todo",{
                method:"post",
                body:JSON.stringify({title}),
                headers:{
                    "Content-Type": "application/json"
                }
            })
            const data=await res.json();
            if(!res.ok){
                throw Error("error")
            }
          setTodo([...todo,data]);
          setTitle("");
            
         } catch (error) {
            console.log(error);
         }finally{
          setLoader(false);
         }
   }

    useEffect(() => {
  

  const fetchTodo = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/todo");
      if (!res.ok) {
        throw new Error("error");
      }

      const data = await res.json();
      setTodo(data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchTodo();

 
}, []);


async function deleteTodo(id) {
  try {
    const res = await fetch(`http://localhost:8080/api/todo/${id}`, {
      method: "DELETE"
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error("error");
    }

   if(res.ok){
    console.log(data.message)
     const newtodo = todo.filter((e) => e.id != id);
    setTodo(newtodo);
   }
  } catch (error) {
    console.log(error);
  }
}

async function updateTodo(id,title) {
  
  try {

    const res= await fetch(`http://localhost:8080/api/todo/${id}`,{
      method:"PATCH",
       headers: {
      "Content-Type": "application/json" 
     },
      body:JSON.stringify({title})
    });

    const data=await res.json();

    // console.log(data);

    if(!res.ok){
      throw  Error(data.error);
    }


    if(res.ok){
      
      let newtodo=todo?.map((e)=>{
        if(e.id==id){
          return {...e,title}
        }
        else{
          return e;
        }
       
      })
      setTodo(newtodo);
    }

    
  } catch (error) {
    console.log(error)
  }
  
}

async function updateComplete(id, completed) {
  
  let complete2 = Boolean(completed);
  console.log(typeof complete2); 
  console.log(complete2);  

  try {
   
    const res = await fetch(`http://localhost:8080/api/todo/hello/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ complete: complete2 }),  
    });

   
    if (res.ok) {
      const data = await res.json(); 
      console.log(data);  

      
      let newTodo = todo.map((e) => {
        if (e.id === id) {
          return { ...e, completed: data.completed }; 
        }
        return e;  
      });

      console.log(newTodo); 
      setTodo(newTodo); 
    } else {
      console.log("Error: " + res.statusText);
    }
  } catch (error) {
    console.log("Error:", error); 
  }
}



    
    
  return(
    <TodoCont.Provider value={{todo,title,handleChangeTitle,addTodo,deleteTodo,updateTodo,loader,updateComplete}}>
        {children}
    </TodoCont.Provider>
  );
}
export function useTodo(){
    const contex=useContext(TodoCont);
    if(!contex){
        throw Error("error");
    }
    return contex;
}