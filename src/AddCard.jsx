import { useRef, useState } from "react"
import { toast } from "react-toastify";
import { useDeck } from "./context/CardContext";


export const AddCard = () => {
    const { cardList, addToList } = useDeck();
    const textareaRef = useRef();

    function handleSubmit(e){
        e.preventDefault();

        const term = e.target.term.value.trim();
        const def = e.target.def.value.trim();

        if(!term || !def){
            toast.error('Missing values');
            return
        }

        if(cardList.some(card => card.term.toLowerCase() === term.toLowerCase())){
            toast.error('Duplicated Term!');
            return
        }

        const newCard = {id: crypto.randomUUID(), term, def, status: 'unlearnt'}
        addToList(newCard);
        textareaRef.scrollHeight = '32px';
        e.target.reset();
    }
    
  return (
    <div className="border border-slate-400 p-2 rounded-xl mb-10">
        <form onSubmit={handleSubmit}>
            <div className='flex gap-2.5'>
                <input name="term" type="text" placeholder="Term" className="bg-slate-100 w-1/2 rounded p-1 h-fit" maxLength={30}></input>
                <textarea 
                    ref={textareaRef} 
                    name="def" 
                    type="text" 
                    placeholder="Definition" 
                    className="bg-slate-100 w-1/2 rounded p-1 overflow-hidden resize-none h-8" 
                    onInput={(e) => {
                        e.target.style.height = `24px`;
                        e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                ></textarea>
                <button type="submit" className="bg-green-700 text-white rounded px-4 py-1 h-fit">Add</button>
            </div>
            
        </form>
    </div>
  )
}
