import React, { Fragment, useEffect, useState } from 'react';

export const Calendar = () => {
    const nameOfDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const today = new Date();

    const testData = [
        // 2026-11-21 (Today) - 3 cards
        {
            cardId: 37,
            userId: 57,
            term: 'verbosity',
            definition: 'the quality or state of using more words than necessary to express an idea',
            repetition: 0,
            lastReview: null,
            nextReview: '2026-11-21'
        },
        {
            cardId: 38,
            userId: 57,
            term: 'ephemeral',
            definition: 'lasting for a very short time',
            repetition: 2,
            lastReview: '2026-11-14',
            nextReview: '2026-11-21'
        },
        {
            cardId: 39,
            userId: 57,
            term: 'laconic',
            definition: 'using very few words',
            repetition: 4,
            lastReview: '2026-10-08',
            nextReview: '2026-11-21'
        },

        // 2026-11-22 (Sunday) - 2 cards
        {
            cardId: 40,
            userId: 57,
            term: 'ubiquitous',
            definition: 'present, appearing, or found everywhere',
            repetition: 1,
            lastReview: '2026-11-19',
            nextReview: '2026-11-22'
        },
        {
            cardId: 41,
            userId: 57,
            term: 'pragmatic',
            definition: 'dealing with things sensibly and realistically',
            repetition: 5,
            lastReview: '2026-09-25',
            nextReview: '2026-11-22'
        },

        // 2026-11-23 (Monday) - Empty day

        // 2026-11-24 (Tuesday) - 4 cards
        {
            cardId: 42,
            userId: 57,
            term: 'ameliorate',
            definition: 'to make something bad or unsatisfactory better',
            repetition: 0,
            lastReview: null,
            nextReview: '2026-11-24'
        },
        {
            cardId: 43,
            userId: 57,
            term: 'equivocate',
            definition: 'to use ambiguous language so as to conceal the truth',
            repetition: 3,
            lastReview: '2026-11-04',
            nextReview: '2026-11-24'
        },
        {
            cardId: 44,
            userId: 57,
            term: 'fastidious',
            definition: 'very attentive to and concerned about accuracy and detail',
            repetition: 6,
            lastReview: '2026-09-12',
            nextReview: '2026-11-24'
        },
        {
            cardId: 45,
            userId: 57,
            term: 'candor',
            definition: 'the quality of being open and honest in expression',
            repetition: 1,
            lastReview: '2026-11-21',
            nextReview: '2026-11-24'
        },

        // 2026-11-25 (Wednesday) - 1 card
        {
            cardId: 46,
            userId: 57,
            term: 'mitigate',
            definition: 'to make less severe, serious, or painful',
            repetition: 2,
            lastReview: '2026-11-17',
            nextReview: '2026-11-25'
        },

        // 2026-11-26 (Thursday) - Empty day

        // 2026-11-27 (Friday) - 5 cards
        {
            cardId: 47,
            userId: 57,
            term: 'esoteric',
            definition: 'intended for or likely to be understood by only a small number of people',
            repetition: 4,
            lastReview: '2026-10-15',
            nextReview: '2026-11-27'
        },
        {
            cardId: 48,
            userId: 57,
            term: 'ostentatious',
            definition: 'characterized by vulgar or pretentious display designed to impress',
            repetition: 0,
            lastReview: null,
            nextReview: '2026-11-27'
        },
        {
            cardId: 49,
            userId: 57,
            term: 'enervate',
            definition: 'to cause someone to feel drained of energy or vitality',
            repetition: 7,
            lastReview: '2026-08-29',
            nextReview: '2026-11-27'
        },
        {
            cardId: 50,
            userId: 57,
            term: 'alacrity',
            definition: 'brisk and cheerful readiness',
            repetition: 3,
            lastReview: '2026-11-09',
            nextReview: '2026-11-27'
        },
        {
            cardId: 51,
            userId: 57,
            term: 'cogent',
            definition: 'clear, logical, and convincing',
            repetition: 1,
            lastReview: '2026-11-20',
            nextReview: '2026-11-27'
        },

        // 2026-11-28 (Saturday) - 2 cards
        {
            cardId: 52,
            userId: 57,
            term: 'perfunctory',
            definition: 'carried out with a minimum of effort or reflection',
            repetition: 4,
            lastReview: '2026-10-12',
            nextReview: '2026-11-28'
        },
        {
            cardId: 53,
            userId: 57,
            term: 'obfuscate',
            definition: 'to render obscure, unclear, or unintelligible',
            repetition: 2,
            lastReview: '2026-11-18',
            nextReview: '2026-11-28'
        },

        // 2026-11-29 (Sunday) - Empty day

        // 2026-11-30 (Monday) - 3 cards
        {
            cardId: 54,
            userId: 57,
            term: 'magnanimous',
            definition: 'generous or forgiving, especially toward a rival or less powerful person',
            repetition: 5,
            lastReview: '2026-10-02',
            nextReview: '2026-11-30'
        },
        {
            cardId: 55,
            userId: 57,
            term: 'pedantic',
            definition: 'excessively concerned with minor details and rules',
            repetition: 0,
            lastReview: null,
            nextReview: '2026-11-30'
        },
        {
            cardId: 56,
            userId: 57,
            term: 'taciturn',
            definition: 'reserved or uncommunicative in speech; saying little',
            repetition: 1,
            lastReview: '2026-11-21',
            nextReview: '2026-11-30'
        },

        // 2026-12-01 (Tuesday) - 2 cards
        {
            cardId: 57,
            userId: 57,
            term: 'superfluous',
            definition: 'unnecessary, especially through being more than enough',
            repetition: 6,
            lastReview: '2026-09-18',
            nextReview: '2026-12-01'
        },
        {
            cardId: 58,
            userId: 57,
            term: 'capricious',
            definition: 'given to sudden and unaccountable changes of mood or behavior',
            repetition: 3,
            lastReview: '2026-11-11',
            nextReview: '2026-12-01'
        },

        // 2026-12-02 (Wednesday) - 4 cards
        {
            cardId: 59,
            userId: 57,
            term: 'sanguine',
            definition: 'optimistic or positive, especially in an apparently bad or difficult situation',
            repetition: 2,
            lastReview: '2026-11-20',
            nextReview: '2026-12-02'
        },
        {
            cardId: 60,
            userId: 57,
            term: 'reticent',
            definition: 'not revealing one’s thoughts or feelings readily',
            repetition: 4,
            lastReview: '2026-10-19',
            nextReview: '2026-12-02'
        },
        {
            cardId: 61,
            userId: 57,
            term: 'zealous',
            definition: 'having or showing great energy or enthusiasm in pursuit of a cause',
            repetition: 0,
            lastReview: null,
            nextReview: '2026-12-02'
        },
        {
            cardId: 62,
            userId: 57,
            term: 'aberration',
            definition: 'a departure from what is normal, usual, or expected',
            repetition: 7,
            lastReview: '2026-09-02',
            nextReview: '2026-12-02'
        },

        // 2026-12-03 (Thursday) - Empty day

        // 2026-12-04 (Friday) - 1 card
        {
            cardId: 63,
            userId: 57,
            term: 'benign',
            definition: 'gentle and kindly; not harmful in effect',
            repetition: 1,
            lastReview: '2026-11-21',
            nextReview: '2026-12-04'
        },

        // 2026-12-05 (Saturday) - 3 cards
        {
            cardId: 64,
            userId: 57,
            term: 'cacophony',
            definition: 'a harsh, discordant mixture of sounds',
            repetition: 5,
            lastReview: '2026-10-06',
            nextReview: '2026-12-05'
        },
        {
            cardId: 65,
            userId: 57,
            term: 'deleterious',
            definition: 'causing harm or damage',
            repetition: 3,
            lastReview: '2026-11-15',
            nextReview: '2026-12-05'
        },
        {
            cardId: 66,
            userId: 57,
            term: 'exacerbate',
            definition: 'to make a problem, bad situation, or negative feeling worse',
            repetition: 2,
            lastReview: '2026-11-21',
            nextReview: '2026-12-05'
        },

        // 2026-12-06 (Sunday) - 2 cards
        {
            cardId: 67,
            userId: 57,
            term: 'gregarious',
            definition: 'fond of company; sociable',
            repetition: 4,
            lastReview: '2026-10-22',
            nextReview: '2026-12-06'
        },
        {
            cardId: 68,
            userId: 57,
            term: 'harangue',
            definition: 'a lengthy and aggressive speech',
            repetition: 0,
            lastReview: null,
            nextReview: '2026-12-06'
        }
    ];

    const weekNumbers = Array.from({ length: 4 }, (_, i) => {
        return getISOWeek(new Date()) + i;
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

        today.setHours(0, 0, 0, 0);

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

    const groupedTestData = groupCardsByDate(testData);

    useEffect(() => {
        // console.log(groupedTestData)
    }, []);

    return (
        <div className="border border-gray-400 rounded-xl p-2 mb-10">
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
                    { groupedTestData.map((date, index) => (
                        <button 
                            className='bg-sky-100 rounded dark:bg-slate-500'
                            key={index}
                            // onClick={}
                        >
                            { date.cards.length}
                        </button> ))}
                </div>
            </div>
        </div>
    )
}
