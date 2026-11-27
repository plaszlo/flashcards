import { useEffect, useState } from 'react';
import { useDeck } from '../context/CardContext';

export const Calendar = () => {
    const { calendarCards, setDailyList } = useDeck();
    const [selectedIndex, setSelectedIndex] = useState(0);
    
    const nameOfDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const today = new Date();
    const weekNumbers = Array.from({ length: 4 }, (_, i) => {
        return getISOWeek(new Date(today)) + i;
    });

    const passedDaysOfWeek = new Array(
        today.getDay() === 0 ? 6 : today.getDay() - 1
    ).fill('');

    function getISOWeek(date) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        const thisWeeksThursday = new Date(d.setDate(d.getDate() + 4 - (d.getDay() || 7)));
        const yearStart = new Date(d.getFullYear(), 0, 1);
        return Math.ceil(
            (((thisWeeksThursday - yearStart) / 86400000) + 1) / 7
        );
    }

    function groupCardsByDate(cards) {
        const grouped = new Map();

        for (let i = 0; i <= 21; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);

            const dateString = date.toISOString().split("T")[0];

            grouped.set(dateString, []);
        }

        cards.forEach(card => {
            const date = card.nextReview.split("T")[0];

            if (grouped.has(date)) {
                grouped.get(date).push(card);
            }
        });

        return Array.from(grouped, ([date, cards]) => ({
            date,
            cards
        }));
    }

    const calendarDays = groupCardsByDate(calendarCards);

    useEffect(() => {
        // console.log(calendarDays[0].cards)
    }, []);

    return (
        <div className="border border-gray-400 rounded-xl p-2 mb-10  dark:border-slate-800 dark:ring dark:ring-inset dark:ring-slate-800">
            <h2 className="text-xl font-semibold mb-2 dark:text-slate-300">Calendar</h2>

            <div className='flex'>
                <div className='flex flex-col gap-2 w-1/8 text-center mr-2 dark:text-slate-300'>
                    <div>Week</div>
                    {weekNumbers.map(week => (
                        <ul
                            key={week}
                            className="border border-gray-200 rounded h-6 mb-1 dark:border-slate-800 dark:border"
                        >
                            <li>{week}</li>
                        </ul>
                    ))}
                </div>

                <div className='w-7/8 grid grid-cols-7 text-center gap-2'>
                    {nameOfDays.map(element => (
                        <div 
                            key={element}
                            className='dark:text-slate-300'
                        >{element}</div>
                    ))}
                    { passedDaysOfWeek.map((day, index) => (
                        <span key={index}>{day}</span>
                    )) }
                    {calendarDays.map((date, index) => (
                        <button
                            key={index}
                            className={`bg-sky-100 rounded cursor-pointer hover:bg-[oklch(91%_0.026_236.824)] dark:bg-slate-500 dark:hover:bg-slate-600 border-2 ${
                                selectedIndex === index 
                                    ? 'border-sky-600 dark:border-sky-400' 
                                    : 'border-transparent'
                            }`}
                            onClick={() => {
                                setSelectedIndex(index);
                                setDailyList(date.cards);
                            }}
                        >
                            {date.cards.length}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
