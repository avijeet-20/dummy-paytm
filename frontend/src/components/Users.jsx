import { useEffect, useMemo, useState } from "react"

import Button from "./Button"



export default function Users() {

const [users,setUser]  = useState();

useEffect(  () => {

     async function  getdata () {
        const data = await fetch('http://localhost:3000/api/v1/user/allusers');

        const json = await data.json();
     
        setUser(json);
       
    }

    getdata();
  
} ,[])    


console.log(users);

return (
    <div className="w-full h-full background-white">
        {users && users.map((user) => (
            <div className="flex justify-between" key={user.id}>
                <div>
                    <div>img</div>
                    <div>{user.name}</div>
                </div>
                <div>
                    <Button>{user.buttonLabel}</Button>
                </div>
            </div>
        ))}
    </div>
);


}