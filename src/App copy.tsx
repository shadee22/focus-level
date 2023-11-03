import React, {useState, useEffect, useCallback, useMemo} from 'react';

interface Quote {
    _id: string;
    content: string;
    author: string;
    tags: string[];
    authorSlug: string;
    length: number;
    dateAdded: string;
    dateModified: string;
}

const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365;
const MONTHS_PER_YEAR = 12;
const DAYS_PER_MONTH = 30.44;
const HOURS_PER_DAY = 24;
const BIRTHDAY = '1993-04-29';
const LIFE_EXPECTANCY = 60;
const QUOTE_API_URL = 'https://api.quotable.io/quotes/random?tags=Wisdom|Motivational';

const App: React.FC = () => {
    const [quote, setQuote] = useState<Quote | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [timeOfDayLeft, setTimeOfDayLeft] = useState<number>(0);
    const [secondsLeft, setSecondsLeft] = useState<number>(0);

    const calculateTimeOfDayLeft = useCallback(() => {
        const currentDate = new Date();
        const hoursPassed = currentDate.getHours() + currentDate.getMinutes() / 60;
        return 100 - (hoursPassed / 24) * 100;
    }, []);

    const calculateSecondsLeftInDay = useCallback(() => {
        const now = new Date();
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
        const msLeft = endOfDay.valueOf() - now.valueOf();
        return Math.floor(msLeft / 1000);
    }, []);

    const calculateTime = useCallback((birthday: string, lifeExpectancy: number) => {
        const currentDate: Date = new Date();
        const birthDate: Date = new Date(birthday);
        const differenceMs: number = currentDate.valueOf() - birthDate.valueOf();
        const yearsAlive: number = differenceMs / MS_PER_YEAR;
        const yearsLeft: number = lifeExpectancy - yearsAlive;
        const monthsLeft: number = (yearsLeft % 1) * MONTHS_PER_YEAR;
        const daysLeft: number = (monthsLeft % 1) * DAYS_PER_MONTH;
        const hoursLeft: number = (daysLeft % 1) * HOURS_PER_DAY;

        return { yearsAlive, yearsLeft, monthsLeft, daysLeft, hoursLeft };
    }, []);

    const { yearsAlive, yearsLeft, monthsLeft, daysLeft, hoursLeft } = calculateTime(BIRTHDAY, LIFE_EXPECTANCY);

    const lifePercentage = useMemo(() => {
        return ((yearsAlive * 365) / (LIFE_EXPECTANCY * 365)) * 100;
    }, [yearsAlive]);

    const timeLeft = `${Math.floor(yearsLeft)} years, ${Math.floor(monthsLeft)} months, ${Math.floor(daysLeft)} days, ${Math.floor(hoursLeft)} hours left.`;

    useEffect(() => {
        const fetchQuote = async () => {
            setLoading(true);
            try {
                const response = await fetch(QUOTE_API_URL);
                const data = await response.json();
                setQuote(data[0]);
            } catch (err) {
                setError('Error fetching quote');
            } finally {
                setLoading(false);
            }
        };

        fetchQuote();
    }, []);

    useEffect(() => {
        setTimeOfDayLeft(calculateTimeOfDayLeft());
        setSecondsLeft(calculateSecondsLeftInDay());

        const interval = setInterval(() => {
            setTimeOfDayLeft(calculateTimeOfDayLeft());
            setSecondsLeft(calculateSecondsLeftInDay());
        }, 1000);

        return () => clearInterval(interval);
    }, [calculateTimeOfDayLeft, calculateSecondsLeftInDay]);


    return (
        <div className='hello-world dark:text-white text-zinc-800'>
            <div className='absolute h-screen w-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-[#000] to-[#595151]'>
                <div
                    className={`absolute inset-0 bg-[url(/public/noise.svg)] opacity-25 brightness-100 contrast-150`}></div>
            </div>
            <div className="w-screen h-screen p-12 relative">
                <div className='-mt-24 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 '>
                    <div className='flex flex-col gap-1 max-w-[250px] mx-auto text-center rounded-xl'>
                        <h1 className="text-6xl mb-4 font-bold opacity-75">
                            {yearsLeft.toFixed(1)}
                        </h1>
                        <p className='text-sm opacity-90'>That's how much left for you.</p>
                        <h2 className="text-xs opacity-50 dark:opacity-70">
                            {timeLeft}
                        </h2>
                    </div>
                    <div className='my-6'>
                        <div className="w-full h-[4px] bg-zinc-200 relative">
                            <div className="absolute left-0 top-0 h-full bg-[#ff7f6c]" style={{width: `${lifePercentage}%`}}></div>
                        </div>
                        <div className='flex justify-between mt-2 px-2'>
                            <div className="text-xs text-center">{lifePercentage.toFixed(2) }%</div>
                            <div className='text-xs font-medium opacity-90'>LIFE</div>
                        </div>
                    </div>
                    <div className='my-6'>
                        <div className="w-full h-[4px] bg-zinc-200 relative">
                            <div className="absolute left-0 top-0 h-full bg-[#98FF98]" style={{width: `${100 - parseFloat(timeOfDayLeft.toFixed(2))}%`}}></div>
                        </div>
                        <div className='flex justify-between mt-2 px-2'>
                            <div className="text-xs text-center">
                                {((100 - parseFloat(timeOfDayLeft.toFixed(2))).toFixed(2))}%
                            </div>
                            <div className='text-xs font-medium opacity-90'>TODAY</div>
                        </div>
                    </div>
                </div>
                <div className='absolute bottom-32 left-1/2 -translate-x-1/2'>
                    {quote && (
                        <div>
                            <div className='max-w-[500px] text-center text-sm flex flex-col gap-1'>
                                <p >{quote?.content}</p>
                                <p className="opacity-50 dark:opacity-70">~ {quote?.author}</p>
                            </div>
                        </div>
                    )}
                    <div className='text-xs mt-8 dark:text-[#a6a6a6] text-center'>Left in your pocket today 💸 {secondsLeft.toLocaleString()}s</div>
                </div>
            </div>
        </div>
    );
}

export default App;
