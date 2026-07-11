import { useDeck } from '../context/CardContext';

export const Card = ({id, term, def}) => {
  const { cardList, removeFromList } = useDeck();

  return (
    <div className=' p-2 flex gap-2.5'>
      <span className="bg-blue-100 w-1/2 rounded p-1">{term}</span>
      <span className="bg-blue-100 w-1/2 rounded p-1">{def}</span>
      <button onClick={() => removeFromList(id)} type="button" className="bg-red-700 text-white rounded px-4 py-1">Del</button>
    </div>
  )
}
