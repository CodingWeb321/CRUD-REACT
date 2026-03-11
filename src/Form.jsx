import { useEffect, useState } from "react";

function Form({ onAddPost,onEditPost,onUpdatePost }) {
  const [formData, setFormData] = useState({
  
    title: "",
    body: "",
  });

  useEffect(()=>{
    if(onEditPost){
      
      setFormData({
        title:onEditPost.title || " ",
        body:onEditPost.body|| " " 
      });
    }
  },[onEditPost])

  const handleChange = (e) => {
    const keyName = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [keyName]: value,
    });
    // console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   if(onEditPost){
    onUpdatePost(onEditPost.id,formData)
   }else{
     onAddPost(formData);
   }
    setFormData({  title: "", body: "" });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className=" flex flex-col mt-2">
       
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
          value={formData.title}
          className="border rounded-2xl border-2-black ml-2 p-2"
        />
      
        <label htmlFor="body" id="body">
          Body:
        </label>
        <input
          type="text"
          id="body"
          name="body"
          onChange={handleChange}
          value={formData.body}
          className="border rounded-2xl border-2-black ml-2 p-2"
        />
        
        <button type="submit" className="border rounded-2xl bg-blue-500 text-white px-4 py-2 mt-2">
          {onEditPost?"Edit":"Submit"}
        </button>
      </form>
    </>
  );
}

export default Form;
