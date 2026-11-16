import { useEffect, useRef, useState } from 'react';
import { useDeck } from '../context/CardContext';

export const DeckCard = ({card}) => {
  const { id, term, definition } = card;
  const { removeFromList, updateCard } = useDeck();
  const textareaRef = useRef();
  const [definitionInput, setDefinition] = useState(definition);
  const [termInput, setTerm] = useState(term);

  useEffect(() => {
    const ta = textareaRef.current;
    ta.style.height = "0px";
    ta.style.height = `${ta.scrollHeight}px`;
  }, []);

  return (
    <div className=' p-2 flex gap-2.5'>
      <input 
        className='bg-sky-100 dark:bg-slate-500 w-1/2 rounded p-1 whitespace-pre-line wrap-break-word min-w-0 overflow-hidden resize-none h-fit'
        maxLength={30}
        value={termInput}
        onBlur={/*() => {updateCard(id, {term: termInput})}*/() => console.log("update term")}
        onChange={
          (e) => {
            setTerm(e.target.value);
          }
        }
      ></input>
      <textarea 
        className='bg-sky-100 dark:bg-slate-500  w-1/2 rounded p-1 whitespace-pre-line wrap-break-word min-w-0 overflow-hidden resize-none'
        ref={textareaRef}
        value={definitionInput}
        onBlur={/*() => {updateCard(id, {def: definition})}*/ () => console.log("update definition")}
        onChange={
          (e) => {
            e.target.style.height = '0px';
            e.target.style.height = `${e.target.scrollHeight}px`;
            setDefinition(e.target.value);
          }
        }
      ></textarea>
        <button onClick={() => removeFromList(id)} type="button" className="bg-red-700 text-white rounded px-4 py-1 h-fit">Del</button> 
    </div>
  )
}
