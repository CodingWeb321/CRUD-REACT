import { useEffect, useState } from "react";
import "./App.css";
import Form from "./Form";

function App() {
  const [post, setPost] = useState([]);
  const[editingPost, setEditingPost] =useState(null);
  // console.log("Current state of posts:", post);
  // console.log(editingPost);
  

  const URL = "http://localhost:5000/posts";


//get post
  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(`${URL}`);
      const data = await response.json();

      setPost(data);
    };
    getPost();
  }, []);

  //add Post 
  const addPost = async (newPostData) => {
    try {
      const response = await fetch(`${URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPostData),
      });

      if (response.ok) {
        const savedPost = await response.json();
        alert(`post added successfully!`);

        setPost((prevPost) => [...prevPost, savedPost]);
        // console.log(post);
      }
    } catch (error) {
      console.log("Error during posting data", error);
    }
  };

//update post 

const updatePost = async(id,updatedData)=>{
 
  try {

     
  const response = await fetch(`${URL}/${id}`,{
    method:"PATCH",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(updatedData)
  })

  if (!response.ok) {
  throw new Error(`Failed to update!`);
}

  const updatedPostFromServer = await response.json();
  setPost((prev)=>prev.map(p=>p.id===id?updatedPostFromServer:p));
  setEditingPost(null);
  alert(`updated successfully`)

  } catch (error) {
    console.log(error);
    
  }



}

//delete post
const deletePost = async(id)=>{
  console.log(id);
  
 try {
  const response = await fetch(`${URL}/${id}`,{
    method:"DELETE"
  })
  if(!response.ok){
    throw new Error("Failed to delete from the server");
    
  }
  setPost((prevPost)=>prevPost.filter(item=>item.id!==id));
  alert(`post deleted successfully`)
 } catch (error) {
  console.log(error);
  
 }
}

  return (
    <div className="flex flex-col items-center mt-20 border-2 rounded-2xl w-auto bg-amber-50 p-2">
      <Form 
      onAddPost={addPost}
       onEditPost={editingPost}
        onUpdatePost={updatePost} 
        
        />
      <h1 >List of Posts </h1>
      <div>
        {post.map((item) => (
          <div key={item.id} className="flex flex-col pt-5 " >
            <div className="bg-gray-700 flex items-center justify-center gap-10 w-80 h-30 p-2 text-white">
             <div>
               <h2>Title : {item.title}</h2>
              <p>Body : {item.body}</p>
             </div>
              <div>
                <button className="border rounded-xl bg-blue-500 text-white px-4 py-2 mt-2 w-30" onClick={()=>setEditingPost(item)}>Edit</button>
                <button className="border rounded-xl bg-red-500 text-white px-4 py-2 mt-2 w-30" onClick={()=>deletePost(item.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
