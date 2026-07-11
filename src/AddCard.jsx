import { useState } from "react"
import { useDeck } from "./context/CardContext";


export const AddCard = () => {
    const { addToList } = useDeck();

    function handleSubmit(e){
        e.preventDefault();
        const newCard = {id: new Date().getTime(), term: e.target.term.value, def: e.target.def.value};
        addToList(newCard);
        e.target.reset();
    }
    
  return (
    <div className="border border-slate-400 mx-auto p-2 rounded-xl mb-10">
        <form onSubmit={handleSubmit}>
            <div className='flex gap-2.5'>
                <input name="term" type="text" placeholder="Term" className="bg-slate-100 w-1/2 rounded p-1"></input>
                <input name="def" type="text" placeholder="Definition" className="bg-slate-100 w-1/2 rounded p-1"></input>
                <button type="submit" className="bg-green-700 text-white rounded px-4 py-1">Add</button>
            </div>
            
        </form>
    </div>
  )
}
