import { useInsertionEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';


export const Signup = () => {

    const [userDetails,setuserDetails] = useState({
        username:"",
        password:"",
        firstName:"",
        lastName:""
    })

    console.log(userDetails);
    const navigate = useNavigate();

    const handleclick = async (e) => {
       
        e.preventDefault();

      
        console.log("control reached");
        const data =    await fetch('http://localhost:3000/api/v1/user/signup',{
                method:"POST",
                body:JSON.stringify(userDetails),
                headers:{
                    "content-type":"application/json"
                }
            });
            console.log("done");
            console.log(data);
            const json = await data.json();

            console.log(json);

            if(json.token){

                console.log('connection reached')
                navigate('/signin')

            }else{

                alert('sign up failed')

            }

    }

    return <div id="top-container" className="bg-white p-8 rounded-md">
        <div id="card-container " className="flex flex-col gap-10">
            <div id="header">
                
                <div className="text-center font-bold text-4xl mb-3">Sign Up</div>
                <div className="text-lg">Enter your information to create an</div>
                <div className="text-center">account</div>
               
            </div>


            <div id="form-container" >

                <form className="flex flex-col gap-3"> 
                    <div>First Name</div>
                    <input placeholder="john" className="border-4 p-2" onChange={(e) => setuserDetails({...userDetails,firstName:e.target.value})} ></input>
                    <div >Last Name</div>
                    <input placeholder="Doe" className="border-4 p-2"  onChange={(e) => setuserDetails({...userDetails,lastName:e.target.value})} ></input>
                    <div>Email</div>
                    <input placeholder="johndoe@example.com"className="border-4 p-2" onChange={(e) => setuserDetails({...userDetails,username:e.target.value})} ></input>
                    <div>Password</div>
                    <input className="border-4 p-2" onChange={(e) => setuserDetails({...userDetails,password:e.target.value})}  ></input>
                     <div  className="w-full bg-black flex justify-center items-center text-white rounded-md h-10"><button type="submit" onClick={handleclick}>Sign up</button></div>

                </form>

            </div>

            <div id="footer  " className="text-center">Already have an account? <a>Login</a></div> 
        </div>
    </div>
}