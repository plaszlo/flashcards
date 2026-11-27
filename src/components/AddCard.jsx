import { useRef, useState } from "react"
import { toast } from "react-toastify";
import { useDeck } from "../context/CardContext";


export const AddCard = () => {
    const { cards, addCard } = useDeck();
    const textareaRef = useRef();

    function handleSubmit(e){
        e.preventDefault();

        const term = e.target.term.value.trim();
        const definition = e.target.definition.value.trim();

        if(!term || !definition){
            toast.error('Missing values');
            return
        }

        if(cards.some(card => card.term.toLowerCase() === term.toLowerCase())){
            toast.error('Duplicated Term!');
            return
        }

        const cardContent = {term: term, definition: definition};
        addCard(cardContent);
        
        textareaRef.scrollHeight = '32px';
        e.target.reset();
    }
    
  return (
    <div className="border border-gray-400 p-2 rounded-xl mb-10 dark:border-slate-800 dark:ring dark:ring-inset dark:ring-slate-800">
        <form onSubmit={handleSubmit}>
            <div className='flex gap-2.5'>
                <input name="term" type="text" placeholder="Term" className="bg-slate-100 w-1/2 rounded p-1 h-fit dark:bg-slate-300" maxLength={60}></input>
                <textarea 
                    ref={textareaRef} 
                    name="definition" 
                    type="text" 
                    placeholder="Definition" 
                    className="bg-slate-100 w-1/2 rounded p-1 overflow-hidden resize-none h-8 dark:bg-slate-300" 
                    onInput={(e) => {
                        e.target.style.height = `24px`;
                        e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                ></textarea>
                <button type="submit" className="bg-green-700 text-white rounded px-4 py-1 h-fit cursor-pointer hover:bg-green-800"><i className="bi bi-plus-lg [-webkit-text-stroke:0.5px]"></i></button>
            </div>
            
        </form>
    </div>
  )
}
