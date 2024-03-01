import Users from "./Users";


export default function Dashboard()  {

    return<div className="bg-white p-8 w-2/3 h-2/3">
        <div id="header" className="flex justify-between border-b-2 p-4"><div className="font-bold text-4xl">Payments App</div>

        <div className="flex gap-2 font-normal text-xl"><div className="">Hello,User</div><div>U</div></div></div>

        <div id="balance-container" className="mt-6  font-semibold text-4xl">Your Balance <span className="text-2xl font-normal">$5000</span> </div> 

        <div className="mt-6 font-semibold text-4xl">Users</div>
        <div id="input container" className="p-4 mt-3"><input placeholder="Search users..." className="w-full border-2 border-black h-10"></input></div>

        <div id="user-container" className="flex flex-col gap-4 text-clip"><Users></Users></div>

    </div>
}