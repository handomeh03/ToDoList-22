import { initdb } from "../db/connection.js";

export async function getTodo(req,res){
    try {
     let db=await initdb();
     let [row,meta]=await db.query("select id, title,completed, description from  todo;")
    return  res.status(200).send(row);
        
    } catch (error) {
     return   res.status(500).json({error:"internel server error"});
    }
}
export async function AddTodo(req, res) {
  let { title } = req.body;
  let completed = false;
  
  try {

    if(!title){
    return  res.status(404).json({error:"please fill the title"})
    }

    let db = await initdb();
    let [row, meta] = await db.execute(
      "INSERT INTO todo (title, completed) VALUES (?, ?);",
      [
        title,
        completed
      ]
    );
    console.log(row);
    let [todo]=await db.execute("select id, title,completed, description from todo where id=? ;",
        [row. insertId]
    )
  return  res.status(200).send(todo[0]);
  } catch (error) {
    console.log(error);
   return res.status(500).json({ error: "Internal Server Error" });
  }
}
export async function deleteTodo(req, res) {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    const db = await initdb();

    
    const [exist] = await db.execute(
      "SELECT id,title, completed, description FROM todo WHERE id = ?",
      [id]
    );

    if (exist.length === 0) {
      return res.status(404).json({ error: "The todo does not exist" });
    }

    
    await db.execute("DELETE FROM todo WHERE id = ?", [id]);

   
    res.status(200).json({
      message: "Todo deleted successfully",
      deletedTodo: exist[0],
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Server error" });
  }
}
export async function updateTodo(req,res) {
   let {title}=req.body;
   let {id}=req.params;
   
   try {
    let db=await initdb();

   if(isNaN(Number(id))){
    return res.status(404).json({error:"invalid id"});
   }

    if(!title){
      return res.status(404).send({error:"please enter the update title"});
    }
    let [row,meta]= await db.execute( "SELECT id,title, completed, description FROM todo WHERE id = ?",
      [
        id
      ]
    )
    if(row.length==0){
      return res.status(404).send({error:"todo does not exist"});
    }
    let [update]= await db.execute("update todo set title =? where id = ?",
      [title,id]
    )
    if(update.affectedRows==0){
      return res.status(404).send({error:"fail update"})
    }

     let [updatedRow] = await db.execute(
      "SELECT id, title, completed, description FROM todo WHERE id = ?",
      [id]
    );
    return res.status(200).send(updatedRow[0]);
    
    
   } catch (error) {
    res.status(500).json({error:"internal server error"})
   }
}
export async function updateComplete(req, res) {
  let { id } = req.params;
  let { complete } = req.body;

  try {
    let db = await initdb();
    
    
    if (isNaN(Number(id))) {
      return res.status(404).send({ error: "Invalid id" });
    }

    
    let [row, meta] = await db.execute(
      "SELECT id, title, completed, description FROM todo WHERE id = ?;",
      [id]
    );

    if (row.length == 0) {
      return res.status(404).send({ error: "Todo does not exist" });
    }

   
    if (typeof complete !== 'boolean') {
      return res.status(400).send({ error: "Invalid value for complete" });
    }

   
    const newCompleteStatus = complete ? 0 : 1;

   
    await db.execute(
      "UPDATE todo SET completed = ? WHERE id = ?",
      [newCompleteStatus, id]
    );

   
    let [completeUpdate] = await db.execute(
      "SELECT id, title, completed, description FROM todo WHERE id = ?;",
      [id]
    );

   
    return res.status(200).send(completeUpdate[0]);

  } catch (error) {
    
    return res.status(500).json({ error: "Internal server error" });
  }
}
