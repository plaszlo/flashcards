import { useEffect, useRef, useState } from 'react';
import { useDeck } from '../context/CardContext';

export const DeckCard = ({card, isLapsed}) => {
  const { cardId, term, definition } = card;
  const { removeCard, updateCard } = useDeck();
  const textareaRef = useRef();
  const [definitionInput, setDefinition] = useState(definition);
  const [termInput, setTerm] = useState(term);

  useEffect(() => {
    const ta = textareaRef.current;
    ta.style.height = "0px";
    ta.style.height = `${ta.scrollHeight}px`;
  }, []);

  function handleUpdate(){
    const cardContent = {
      term: termInput,
      definition: definitionInput
    }
    updateCard(cardId, cardContent);
  }

  return (
    <div className='p-2 flex gap-2.5'>
      <input 
        className={`${isLapsed ? 'bg-red-100 hover:bg-[oklch(89.5%_0.032_17.717)] dark:bg-[rgb(142,98,98)] dark:hover:bg-[oklch(49.5%_0.058_19.102)]' : 'bg-sky-100 hover:bg-[oklch(91%_0.026_236.824)] dark:bg-slate-500 dark:hover:bg-slate-600'} w-1/2 rounded p-1 whitespace-pre-line wrap-break-word min-w-0 overflow-hidden resize-none h-fit`}
        maxLength={30}
        value={termInput}
        onBlur={handleUpdate}
        onChange={
          (e) => {
            setTerm(e.target.value);
          }
        }
      ></input>
      <textarea 
        className={`${ isLapsed ? 'bg-red-100 hover:bg-[oklch(89.5%_0.032_17.717)] dark:bg-[rgb(142,98,98)] dark:hover:bg-[oklch(49.5%_0.058_19.102)]' : 'bg-sky-100 hover:bg-[oklch(91%_0.026_236.824)] dark:bg-slate-500 dark:hover:bg-slate-600'}  w-1/2 rounded p-1 whitespace-pre-line wrap-break-word min-w-0 overflow-hidden resize-none`}
        ref={textareaRef}
        value={definitionInput}
        onBlur={handleUpdate}
        onChange={
          (e) => {
            e.target.style.height = '0px';
            e.target.style.height = `${e.target.scrollHeight}px`;
            setDefinition(e.target.value);
          }
        }
      ></textarea>
        {/* <button onClick={() => removeCard(cardId)} type="button" className="bg-red-700 text-white rounded px-4 py-1 h-fit">Del</button>  */}
        <i onClick={() => removeCard(cardId)} type="button" className="bi bi-backspace-fill text-2xl text-red-700 h-fit cursor-pointer hover:text-red-800"></i> 
    </div>
  )
}
