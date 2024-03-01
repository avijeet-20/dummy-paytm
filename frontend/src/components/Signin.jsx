

export default function Signin() {

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
                navigate('/dashboard')

            }else{

                alert('sign in failed')

            }

    }


    return  <div id="top-container" className="bg-white p-8 rounded-md">
    <div id="card-container " className="flex flex-col gap-10">
        <div id="header">
            
            <div className="text-center font-bold text-4xl mb-3">Sign IN</div>
            <div className="text-lg">Enter your information to create an</div>
            <div className="text-center">account</div>
           
        </div>


        <div id="form-container" >

            <form className="flex flex-col gap-3"> 
               
                
                <div>Email</div>
                <input placeholder="johndoe@example.com"className="border-4 p-2" onChange={(e) => setuserDetails({...userDetails,username:e.target.value})} ></input>
                <div>Password</div>
                <input className="border-4 p-2" onChange={(e) => setuserDetails({...userDetails,password:e.target.value})}  ></input>
                 <div  className="w-full bg-black flex justify-center items-center text-white rounded-md h-10"><button type="submit" onClick={handleclick}>Sign in</button></div>

            </form>

        </div>

        <div id="footer  " className="text-center">Don't have an account? <a href="http://localhost:5173/">Sign Up</a></div> 
    </div>
</div>

}
