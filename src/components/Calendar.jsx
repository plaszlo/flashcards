import { Fragment } from 'react';

export const Calendar = () => {
    const nameOfDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const arr = new Array(28).fill(0);

    const today = new Date();

    const schedule = [
        {
            date: new Date(2026, 7, 23),
            cards: [
                { id: crypto.randomUUID(), term: 'car', def: 'people use it to go faster', status: 'unlearnt', repetition: 0, daysSincePractice: undefined },
                { id: crypto.randomUUID(), term: 'dog', def: 'humans best friend', status: 'unlearnt', repetition: 0, daysSincePractice: undefined },
                { id: crypto.randomUUID(), term: 'food', def: 'fuel to have energy', status: 'unlearnt', repetition: 1, daysSincePractice: undefined }
            ]
        },
        {
            date: new Date(2026, 7, 24),
            cards: []
        },
        {
            date: new Date(2026, 7, 25),
            cards: [
                { id: crypto.randomUUID(), term: 'walk', def: 'goping on foot', status: 'unlearnt', repetition: 0, daysSincePractice: undefined },
                { id: crypto.randomUUID(), term: 'pc', def: 'working or leisure tool', status: 'unlearnt', repetition: 1, daysSincePractice: undefined },
            ]
        },
        {
            date: new Date(2026, 7, 26),
            cards: [
                { id: crypto.randomUUID(), term: 'car', def: 'big long vehicle for transport', status: 'unlearnt', repetition: 0, daysSincePractice: undefined }
            ]
        },
        {
            date: new Date(2026, 7, 24),
            cards: []
        },
        {
            date: new Date(2026, 7, 24),
            cards: []
        },
       
    ]

    const weekNumbers = Array.from({ length: 4 }, (_, i) => {
        return getISOWeek(new Date()) + i;
    });

    

    const passedDaysOfWeek = new Array(
        today.getDay() === 0 ? 6 : today.getDay() - 1
    ).fill('');
    const days = new Array(28 - passedDaysOfWeek.length).fill(0);
    const remainingDaysOfWeek = new Array(7 - passedDaysOfWeek.length).fill(0);

    const calendar = [
        {
            weekNumber: getISOWeek(today),
            days: [...passedDaysOfWeek, ...remainingDaysOfWeek]
        },
        {
            weekNumber: getISOWeek(today) + 1,
            days: [0, 0, 0, 0, 0, 0, 0]
        },
        {
            weekNumber: getISOWeek(today) + 2,
            days: [0, 0, 0, 0, 0, 0, 0]
        },
        {
            weekNumber: getISOWeek(today) + 3,
            days: [0, 0, 0, 0, 0, 0, 0]
        },
        {
            weekNumber: getISOWeek(today) + 3,
            days: [0, 0, 0, 0, 0, 0, 0]
        }
    ];

    console.log(weekNumbers);

    function getISOWeek(date) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        const thisWeeksThursday = new Date(d.setDate(d.getDate() + 4 - (d.getDay() || 7)));
        const yearStart = new Date(d.getFullYear(), 0, 1);
        return Math.ceil(
            (((thisWeeksThursday - yearStart) / 86400000) + 1) / 7
        );
    }

    const repProgDesign = {
        0: 'bg-red-500',
        1: 'bg-yellow-500'
    }

    return (
        <div className="border border-gray-400 rounded-xl p-2 mb-10 dark:border-2 dark:border-gray-950 ">
            <h2 className="text-xl font-semibold mb-2 dark:text-slate-300">Calendar</h2>

            <div className='flex'>
                <div className='flex flex-col gap-2 w-1/8 text-center mr-2 dark:text-slate-300'>
                    <div>Week</div>
                    {weekNumbers.map(week => (
                        <ul
                            key={week}
                            className="border border-gray-200 rounded h-6 "
                        >
                            <li>{week}</li>
                        </ul>
                    ))}
                </div>

                <div className='w-7/8 grid grid-cols-7 grid-rows-5 text-center gap-2 dark:text-slate-300'>
                    {nameOfDays.map(element => (
                        <div key={element}>{element}</div>
                    ))}
                    { passedDaysOfWeek.map(day => (
                        <span>{day}</span>
                    )) }
                    {schedule.map(day => {
                        const grouped = Object.groupBy(day.cards, card => card.repetition);

                        return (
                            <button className="bg-gray-200 rounded h-6 flex gap-1">
                                {Object.entries(grouped).map(([repetition, cards]) => (
                                    <span key={repetition} className={`${repProgDesign[repetition]} px-1.75 py-0.125 rounded-full`}>
                                        {cards.length}
                                    </span>
                                ))}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
