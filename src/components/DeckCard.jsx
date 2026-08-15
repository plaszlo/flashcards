import { useEffect, useRef, useState } from 'react';
import { useDeck } from '../context/CardContext';

export const DeckCard = ({card}) => {
  const { id, term, def, status } = card;
  const { cardList, removeFromList, updateCard } = useDeck();
  const textareaRef = useRef();
  const [definition, setDefinition] = useState(def);
  const [termInput, setTerm] = useState(term);

  useEffect(() => {
    const ta = textareaRef.current;
    ta.style.height = "0px";
    ta.style.height = `${ta.scrollHeight}px`;
  }, []);

  const statusClasses = {
    practising: 'bg-orange-100',
    unlearnt: 'bg-sky-100',
    learnt: 'bg-emerald-50 text-slate-500',
  };

  console.log(status);

  return (
    <div className=' p-2 flex gap-2.5'>
      <i onClick={() => updateCard(id, {status: 'practising'})} className='bi bi-arrow-up-circle text-green-700 text-2xl hover:drop-shadow-[0_0_10px_rgba(80,230,80,0.9)]'></i>
      <input 
        className={`${statusClasses[status]} w-1/2 rounded p-1 whitespace-pre-line wrap-break-word min-w-0 overflow-hidden resize-none h-fit`}
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
        className={`${statusClasses[status]}  w-1/2 rounded p-1 whitespace-pre-line wrap-break-word min-w-0 overflow-hidden resize-none`}
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
