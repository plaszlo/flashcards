import { useEffect, useState } from "react";

export const PracticeCard = ({card, isPractised, onPractised}) => {
    const { id, term, def, status } = card;
    const [termInput, setTermInput] = useState('');

    useEffect(() => {
      if(termInput === term){
        onPractised(id);
        setTermInput('');
      }
    }, [termInput]);

  return (
      <>
        { isPractised ? (
          <div className="p-2 flex gap-2.5">
            <span className='bg-emerald-100 p-1 rounded w-1/2 h-fit dark:bg-mist-500' readOnly={true}>{term}</span>
            <span className="bg-emerald-100 p-1 rounded w-1/2 dark:bg-mist-500">{def}</span>
          </div>
        ) : (
          <div className="p-2 flex gap-2.5">
            <input onChange={(e) => setTermInput(e.target.value)} className='bg-sky-100 p-1 rounded w-1/2 h-fit dark:bg-slate-300' placeholder="Type the correct term ..."/>
            <span className="bg-sky-100 p-1 rounded w-1/2 dark:bg-slate-500">{def}</span>
          </div>
        ) }
    </>
  ) 
}
