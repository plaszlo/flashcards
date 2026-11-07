import { toast } from "react-toastify";
import { amendUser, deleteUser } from "../services/authService";

export const Settings = () => {
   async function handleAmend(e){
      e.preventDefault();
      const authDetails = {
         userId: 15, // TODO: Make this dynamic
         name: e.target.name.value,
         email: e.target.email.value
      }

      try {
         const success = await amendUser(authDetails);
         if(success){
            toast.success("Amended successfully");
         }
      } catch (error) {
         console.log(error.message)
      }
   }

   async function handleDelete(){
      try {
         const success = await deleteUser(16); // TODO: Make this dynamic
         if(success){
            console.log("deleted account successfully");
         }
      } catch (error) {
         console.log(error.message);
      }
   }

   return (
      <main className="max-w-7xl mx-auto p-5 min-h-screen dark:bg-slate-900">
         <div className="max-w-xl mx-auto border border-gray-400 rounded-xl p-2">
            <h1 className="text-xl font-semibold mb-3 dark:text-slate-300 ">Settings</h1>
            <form onSubmit={handleAmend} className='mb-5'>
               <div className="grid grid-cols-4 gap-2">
                  <label htmlFor="name" className="ml-3 dark:text-slate-300">User Name</label>
                  <input type="name" id="name" name="name" className="bg-gray-100 col-span-3 px-1 dark:bg-slate-300" placeholder="New name here ..."/>
                  <label htmlFor="email" className="ml-3 dark:text-slate-300">Email</label>
                  <input type="email" id="email" name="email" className="bg-gray-100 col-span-3 px-1 mb-3 dark:bg-slate-300" placeholder="New email here ..." />
               </div>
               <div className="text-center">
                  <button 
                     type="submit"
                     className="justify-center w-30 bg-sky-600 text-white rounded text-xl"
                  >Amend</button>
               </div>
            </form>

            <div className="grid grid-cols-3 gap-2 items-center mb-3">
               <p className="text-red-600 ml-3">Account</p>
               <div className="flex justify-center">
                  <button 
                     className="justify-center w-30 bg-red-600 text-white rounded text-xl"
                     onClick={handleDelete}
                  >Delete</button>
               </div>
            </div>
         </div>
      </main>
   )
}
