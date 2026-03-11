
import { Form, useForm } from "react-hook-form";

function Login({onLogin}) {

    console.log(`render....................`);
    
    const {register, handleSubmit, formState:{errors}} = useForm();
    // console.log(useForm());
    
    
    const  submit =(data)=>{
        if(data.firstname==="admin" && data.password === "123"){
            console.log(`form output is logged`,data);
            onLogin(true);
        }
    }

    // console.log(errors);
    
    
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col py-4 gap-2 px-2 border-2 rounded-2xl my-50 w-fit mx-100 ">
            <h2>Login Page</h2>
           <div>
            {errors.firstname && <p className="text-red-500">{errors.firstname.message} </p>}
            First Name:  <input type="text" className="border"  {...register('firstname', {required:"first name is required ", minLength: {value:3, message:"you need 3 character at least"},})}/>
           </div>
           <div>
            
            {errors.password && <p className="text-red-500">{errors.password.message} </p>}
            Password : <input type="password" className="border" {...register('password',{required:'password is required', minLength:{value:3, message:"you need 3 length password "}})} />
           </div>
           <div>
            <button className="bg-blue-500 px-2 py-2 rounded-2xl cursor-pointer border">Submit</button>
           </div>
        </form>
    );
}

export default Login;