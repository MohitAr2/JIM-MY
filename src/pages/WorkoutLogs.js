import React, { useState, useEffect } from 'react';
import '../styles/components.css';
import workoutData from './jason/data/workoutData.json';
import recommendedWorkouts from './jason/data/recommended.json';
import armWorkouts from './jason/data/arm.json';
import legWorkouts from './jason/data/leg.json';
import chestWorkouts from './jason/data/chest.json';
import backWorkouts from './jason/data/back.json';
import shoulderWorkouts from './jason/data/shoulder.json';
import absWorkouts from './jason/data/abs.json';
import cardioWorkouts from './jason/data/cardio.json';

const workoutEmojiMap = {
    "push day": "🫸",
    "pull day": "🫷",
    "leg day": "🦵",
    "rest day": "🛌",
    "arm day": "💪",
    "chest day": "",
    "back day": "🔙",
    "abs": "🆎",
    "shoulders": "🤷",
    "upper body day": "🏋️‍♂️",
    "lower body day": "🧍",
    "cardio": "🏃‍♂️",
    "cheat day": "🍔",
    "recommended": "✨"
};

const workoutPlans = {
    ppl: ["push day", "pull day", "leg day", "rest day"],
    bro: ["chest day", "back day", "shoulders", "arm day", "leg day", "rest day"],
    upperLower: ["upper body day", "rest day", "lower body day", "rest day"]
};

const getWorkoutsForDay = (day, plan) => {
    switch (plan) {
        case "ppl":
            return day % 4 === 0 ? "rest day" : workoutPlans.ppl[day % 4];
        case "bro":
            return day % 6 === 0 ? "rest day" : workoutPlans.bro[day % 6];
        case "upperLower":
            return day % 4 === 0 ? "rest day" : workoutPlans.upperLower[day % 4];
        case "recommended":
            return recommendedWorkouts[day % recommendedWorkouts.length].type;
        default:
            return "rest day";
    }
};

const getWorkoutList = (workoutType) => {
    switch (workoutType) {
        case "push day":
            return [...chestWorkouts, ...shoulderWorkouts, ...armWorkouts];
        case "pull day":
            return [...backWorkouts, ...armWorkouts];
        case "leg day":
            return legWorkouts;
        case "chest day":
            return chestWorkouts;
        case "back day":
            return backWorkouts;
        case "shoulders":
            return shoulderWorkouts;
        case "arm day":
            return armWorkouts;
        case "upper body day":
            return [...chestWorkouts, ...shoulderWorkouts, ...armWorkouts];
        case "lower body day":
            return [...legWorkouts, ...absWorkouts];
        case "cardio":
            return [...cardioWorkouts, ...absWorkouts];
        default:
            return [];
    }
};

const WorkoutLogs = () => {
    
    const [workoutLogs, setWorkoutLogs] = useState(workoutData);
    const [selectedDay, setSelectedDay] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [workoutPlan, setWorkoutPlan] = useState("ppl");
    const [date, setDate] = useState(new Date());

    const daysInMonth = new Array(30).fill(null);

    useEffect(() => {
        // Load workout data from localStorage if available
        const storedData = localStorage.getItem('workoutData');
        if (storedData) {
            setWorkoutLogs(JSON.parse(storedData));
        }
    }, []);

    useEffect(() => {
        // Backup data to localStorage
        localStorage.setItem('workoutData', JSON.stringify(workoutLogs));
    }, [workoutLogs]);

    const handleDayClick = (day) => {
        setSelectedDay(day);
        setShowOverlay(true);
    };

    const closeOverlay = () => {
        setShowOverlay(false);
    };

    const handleAddWorkout = (workout) => {
        const selectedDate = new Date(date.getFullYear(), date.getMonth(), selectedDay).toISOString().split('T')[0];
        setWorkoutLogs((prevLogs) => ({
            ...prevLogs,
            [selectedDate]: [...(prevLogs[selectedDate] || []), workout]
        }));
    };

    const handleWorkoutPlanChange = (event) => {
        setWorkoutPlan(event.target.value);
    };

    const handleRecommendation = () => {
        setWorkoutPlan("recommended");
    };

    const saveLocally = () => {
        localStorage.setItem('workoutData', JSON.stringify(workoutLogs));
    };

    const changeMonth = (direction) => {
        setDate(new Date(date.getFullYear(), date.getMonth() + direction, 1));
    };

    const getEmojiForWorkout = (workouts) => {
        return workouts ? workouts.map((w, index) => <span key={index}>{workoutEmojiMap[w]}</span>) : "💪";
    };

    const renderCalendar = () => {
        const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
        const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const days = [];
        for (let i = 1; i <= endDate.getDate(); i++) {
            const currentDate = new Date(date.getFullYear(), date.getMonth(), i);
            const formattedDate = currentDate.toISOString().split('T')[0];
            const workoutType = getWorkoutsForDay(i, workoutPlan);
            const isPast = currentDate < new Date();
            days.push(
                <div
                    key={i}
                    className={`calendar-day ${currentDate.toDateString() === date.toDateString() ? 'selected' : ''} ${isPast ? 'completed' : ''}`}
                    onClick={() => handleDayClick(i)}
                >
                    <span>{i}</span>
                    <span>{workoutEmojiMap[workoutLogs[formattedDate]?.[0]?.type || workoutType]}</span>
                </div>
            );
        }
        return days;
    };
    const updateScrollbarThumb = (day) => {
        const workoutType = getWorkoutsForDay(day, workoutPlan);
        const emoji = workoutEmojiMap[workoutType] || "💪";
        const scrollbarThumb = document.querySelector('.overlay-content::-webkit-scrollbar-thumb');
        if (scrollbarThumb) {
            scrollbarThumb.style.backgroundImage = `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><text y="20" font-size="20">${emoji}</text></svg>')`;
        }
    };
    useEffect(() => {
        const dropdownItems = document.querySelectorAll('.dropdown ul li');
        const dropdownHeader = document.querySelector('.dropdown h1');

        dropdownItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                dropdownItems.forEach((i) => i.classList.remove('selected'));
                item.classList.add('selected');
                dropdownHeader.innerHTML = item.innerHTML;
                dropdownHeader.className = `selected-${index + 1}`;
                setWorkoutPlan(item.getAttribute('data-value'));
            });
        });
    }, []);

    return (
        <div className="workout-logs-page">
            <div className="calendar-container">
                <div className="calendar-header">
                    <button className="button-3d" onClick={() => changeMonth(-1)}>
                        <div className="button-top">
                            <span className="material-icons">❮</span>
                        </div>
                        <div className="button-bottom"></div>
                        <div className="button-base"></div>
                    </button>
                    <h2 className="month-title">{date.toLocaleString('default', { month: 'long' })}</h2>
                    {/* <button className="today-button" onClick={goToToday}>.</button> */}
                    <button className="button-3d" onClick={() => changeMonth(1)}>
                        <div className="button-top">
                            <span className="material-icons">❯</span>
                        </div>
                        <div className="button-bottom"></div>
                        <div className="button-base"></div>
                    </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button className="recommendation-button" onClick={handleRecommendation}>✨</button>
                </div>
                <div className="workout-plan-selector">
                    <div className="dropdown workout-plan-selector" id="workout-plan">
                        <h1>Choose a workout plan</h1>
                        <ul>
                            <li data-value="ppl"><b>PPL</b> (Push, Pull, Legs)</li>
                            <li data-value="bro"><b>Bro Split</b></li>
                            <li data-value="upperLower"><b>Upper-Lower Split</b></li>
                        </ul>
                    </div>
                </div>
                <div className="calendar-grid">
                    {renderCalendar()}
                </div>
            </div>

            {showOverlay && (
                <div className="overlay">
                    <div className="overlay-content">
                        <h3>Select Workout for Day {selectedDay}</h3>
                        <ul>
                            {getWorkoutList(getWorkoutsForDay(selectedDay, workoutPlan)).map((workout, index) => (
                                <li key={index}>
                                    <input
                                        type="checkbox"
                                        id={`workout-${index}`}
                                        onChange={() => handleAddWorkout(workout.name)}
                                    />
                                    <label htmlFor={`workout-${index}`}>{workout.name}</label>
                                </li>
                            ))}
                        </ul>
                        <button onClick={closeOverlay}>Close</button>
                        <button onClick={saveLocally}>Save Locally</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkoutLogs;