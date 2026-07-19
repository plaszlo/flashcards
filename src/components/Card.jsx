import { useEffect, useRef, useState } from 'react';
import { useDeck } from '../context/CardContext';

export const Card = ({id, term, def}) => {
  const { cardList, removeFromList, updateCard } = useDeck();
  const textareaRef = useRef();
  const [definition, setDefinition] = useState(def);
  const [termInput, setTerm] = useState(term);

  useEffect(() => {
    const ta = textareaRef.current;
    ta.style.height = "0px";
    ta.style.height = `${ta.scrollHeight}px`;
  }, []);

  return (
    <div className=' p-2 flex gap-2.5'>
      <input 
        className="bg-blue-100 w-1/2 rounded p-1 whitespace-pre-line wrap-break-word min-w-0 overflow-hidden resize-none h-fit"
        maxLength={30}
        value={termInput}
        onBlur={() => {updateCard(id, {term: termInput})}}
        onChange={
          (e) => {
            setTerm(e.target.value);
          }
        }
      ></input>
      <textarea 
        className="bg-blue-100 w-1/2 rounded p-1 whitespace-pre-line wrap-break-word min-w-0 overflow-hidden resize-none"
        ref={textareaRef}
        value={definition}
        onBlur={() => {updateCard(id, {def: definition})}}
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
