import { useContext } from "react";
import { register } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

export const Registration = () => {
    const { login} = useContext(AuthContext);

    async function handleRegister(e){
        e.preventDefault();
        const authDetails = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            passwordConfirm: e.target.passwordConfirm.value
        }

        try {
            const token = await register(authDetails);
            login(token);
            toast.success("Registration is complete")
        }
        catch (error) {
            toast.error(error.message);
        }
    }

    return (
    <div className="max-w-xl mx-auto border border-gray-400 rounded-xl p-2 dark:border-slate-800 dark:ring dark:ring-inset dark:ring-slate-800">
        <h1 className="font-semibold text-xl mb-5 dark:text-slate-300">Register</h1>

        <form onSubmit={handleRegister}>
            <div className="grid grid-cols-4 gap-2">
                <label htmlFor="name" className="ml-3 mb-2 dark:text-slate-300">User Name</label>
                <input type="name" id="name" name="name" className="mr-3 mb-2 bg-gray-100 col-span-3 px-1 dark:bg-slate-300" placeholder="Type name here ..." />
                <label htmlFor="email" className="ml-3 mb-2 dark:text-slate-300">Email</label> {/* do I need <label> tag for all forms, is <div> not good? */}
                <input type="email" id="email" name="email" className="mr-3 mb-2 bg-gray-100 col-span-3 px-1 dark:bg-slate-300" placeholder="Type email here ..." /> { /* do i need all of these type, id, name attributes? */}
                <label htmlFor="password" className="ml-3 mb-2 dark:text-slate-300">Password</label>
                <input type="password" id="password" name="password" className="mr-3 mb-2 bg-gray-100 col-span-3 px-1 dark:bg-slate-300" placeholder="Type password here ..."></input>
                <label htmlFor="passwordConfirm" className="ml-3 mb-2 dark:text-slate-300">Conf Password</label>
                <input type="password" id="passwordConfirm" name="passwordConfirm" className="mr-3 mb-2 bg-gray-100 col-span-3 px-1 dark:bg-slate-300" placeholder="Type password here ..."></input>
            </div>
            <div className="text-center">
                <button type="submit" className="w-30 bg-emerald-600 text-white rounded text-xl my-5">Submit</button>
            </div>
        </form>
    </div>
    )
}
