import { useContext } from "react";
import { register } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

export const Register = () => {
    const { setIsLoggedIn} = useContext(AuthContext);

    async function handleRegister(e){
        e.preventDefault();
        const authDetails = {
            name: e.target.name.value,
            email: e.target.email.value
        }

        try{
            const success = await register(authDetails);
            if(success){
                setIsLoggedIn(true);
            }
        }
        catch(error){
            console.log(error.message);
        }
    }

  return (
    <main className="max-w-7xl mx-auto p-5 min-h-screen dark:bg-slate-900">
        <div className="max-w-xl mx-auto border border-gray-400 rounded-xl p-2">
            <h1 className="font-semibold text-xl mb-3 dark:text-slate-300">Register</h1>

            <form onSubmit={handleRegister}>
                <div className="grid grid-cols-4 gap-2">
                    <label htmlFor="name" className="ml-3 dark:text-slate-300">User Name</label>
                    <input type="name" id="name" name="name" className="bg-gray-100 col-span-3 px-1 dark:bg-slate-300" placeholder="Type name here ..."/>
                    <label htmlFor="email" className="ml-3 dark:text-slate-300">Email</label> {/* do I need <label> tag for all forms, is <div> not good? */}
                    <input type="email" id="email" name="email" className="bg-gray-100 col-span-3 px-1 mb-3 dark:bg-slate-300" placeholder="Type email here ..."/> { /* do i need all of these type, id, name attributes? */ }
                    {/* <div className="">Password</div>
                    <input className="bg-gray-100 col-span-3 px-1"></input>
                    <div className="">Conf Password</div>
                    <input className="bg-gray-100 col-span-3 px-1"></input> */}
                </div>
                <div className="text-center">
                    <button type="submit" className="w-30 bg-emerald-600 text-white rounded text-xl my-3">Submit</button>
                </div>
            </form>
        </div>
    </main>
  )
}
