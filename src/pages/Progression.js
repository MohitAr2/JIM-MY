// // src/pages/Progression.js
// import React, { useState, useEffect } from 'react';
// import '../styles/components.css';

// const workoutToBodyParts = {
//     "push day": { shoulders: 3, chest: 3, arms: 3 },
//     "pull day": { back: 3, arms: 3 },
//     "leg day": { legs: 5 },
//     "rest day": {},
//     "arm day": { arms: 3 },
//     "chest day": { chest: 3 },
//     "back day": { back: 3 },
//     "abs": { abs: 3 },
//     "shoulders": { shoulders: 3 },
//     "upper body day": { shoulders: 3, chest: 3, arms: 3 },
//     "lower body day": { legs: 5 },
//     "cardio": { legs: 2, abs: 2 }
// };

// const bodyParts = ["shoulders", "back", "legs", "arms", "chest", "abs"];

// const fetchWorkoutLogs = () => {
//     // Mock data for the last 4 days of workouts
//     return ["shoulders", "leg day", "cardio", "rest day"];
// };

// const Progression = () => {
//     const [levels, setLevels] = useState(() => {
//         const initialLevels = bodyParts.reduce((acc, part) => {
//             acc[part] = 0;
//             return acc;
//         }, {});
//         return initialLevels;
//     });

//     useEffect(() => {
//         const lastWorkouts = fetchWorkoutLogs();
//         const newLevels = { ...levels };

//         lastWorkouts.forEach(workout => {
//             const parts = workoutToBodyParts[workout];
//             if (parts) {
//                 for (const part in parts) {
//                     newLevels[part] = Math.max(newLevels[part], parts[part]);
//                 }
//             }
//         });

//         setLevels(newLevels);
//     }, []);

//     const handleLevelChange = (part, level) => {
//         setLevels(prevLevels => ({
//             ...prevLevels,
//             [part]: level
//         }));
//     };

//     return (
//         <div className="progression-container">
//             <h2>Progression Overview</h2>
//             {bodyParts.map(part => (
//                 <div key={part} className="progression-bar">
//                     <span className="body-part">{part}</span>
//                     <div className="bar">
//                         {[...Array(5)].map((_, i) => (
//                             <div
//                                 key={i}
//                                 className={`level ${i < levels[part] ? 'filled' : ''}`}
//                                 onClick={() => handleLevelChange(part, i + 1)}
//                             >
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Progression;



// src/pages/Progression.js
import React, { useState, useEffect } from 'react';
import '../styles/components.css';

const workoutToBodyParts = {
    "push day": { shoulders: 3, chest: 3, arms: 3 },
    "pull day": { back: 3, arms: 3 },
    "leg day": { legs: 5 },
    "rest day": {},
    "arm day": { arms: 3 },
    "chest day": { chest: 3 },
    "back day": { back: 3 },
    "shoulders": { shoulders: 3 },
    "upper body day": { shoulders: 3, chest: 3, arms: 3 },
    "lower body day": { legs: 5 },
    "cardio": { legs: 2 }
};

const bodyParts = ["head", "shoulders", "back", "legs", "arms", "chest"];

const fetchWorkoutLogs = () => {
    // Mock data for the last 4 days of workouts
    return ["shoulders", "leg day", "cardio", "rest day"];
};

const levelColors = [
    "#E9EED9", // Lightest (recovering)
    "#CBD2A4",
    "#A8B77D",
    "#9A7E6F",
    "#54473F"  // Darkest (tired)
];

const Progression = () => {
    const [levels, setLevels] = useState(() => {
        const initialLevels = bodyParts.reduce((acc, part) => {
            acc[part] = 0;
            return acc;
        }, {});
        return initialLevels;
    });

    const [showLabels, setShowLabels] = useState(false);

    useEffect(() => {
        const lastWorkouts = fetchWorkoutLogs();
        const newLevels = { ...levels };

        lastWorkouts.forEach(workout => {
            const parts = workoutToBodyParts[workout];
            if (parts) {
                for (const part in parts) {
                    newLevels[part] = Math.max(newLevels[part], parts[part]);
                }
            }
        });

        setLevels(newLevels);
    }, []);

    const handleLevelChange = (part, level) => {
        setLevels(prevLevels => ({
            ...prevLevels,
            [part]: level
        }));
    };

    return (
        <div className="progression-container">
            <button onClick={() => setShowLabels(!showLabels)}>
                {showLabels ? 'Hide Labels' : 'Show Labels'}
            </button>
            <div className="body-diagram">
                <div className="body-part-label">Front</div>
                <svg viewBox="0 0 200 400" className="body-svg">
                    {/* Front View */}
                    <rect x="70" y="20" width="60" height="40" fill={levelColors[levels.head]} onClick={() => handleLevelChange('head', (levels.head + 1) % 5)} />
                    <rect x="50" y="60" width="20" height="40" fill={levelColors[levels.shoulders]} onClick={() => handleLevelChange('shoulders', (levels.shoulders + 1) % 5)} />
                    <rect x="130" y="60" width="20" height="40" fill={levelColors[levels.shoulders]} onClick={() => handleLevelChange('shoulders', (levels.shoulders + 1) % 5)} />
                    <rect x="70" y="100" width="60" height="140" fill={levelColors[levels.chest]} onClick={() => handleLevelChange('chest', (levels.chest + 1) % 5)} />
                    <rect x="50" y="100" width="20" height="80" fill={levelColors[levels.arms]} onClick={() => handleLevelChange('arms', (levels.arms + 1) % 5)} transform="rotate(15 60 140)" />
                    <rect x="130" y="100" width="20" height="80" fill={levelColors[levels.arms]} onClick={() => handleLevelChange('arms', (levels.arms + 1) % 5)} transform="rotate(-15 140 140)" />
                    <rect x="70" y="240" width="20" height="100" fill={levelColors[levels.legs]} onClick={() => handleLevelChange('legs', (levels.legs + 1) % 5)} />
                    <rect x="110" y="240" width="20" height="100" fill={levelColors[levels.legs]} onClick={() => handleLevelChange('legs', (levels.legs + 1) % 5)} />
                    {showLabels && (
                        <>
                            <text x="100" y="40" textAnchor="middle" fill="black"></text>
                            <text x="40" y="80" textAnchor="middle" fill="black">Shoulders</text>
                            <text x="160" y="80" textAnchor="middle" fill="black">Shoulders</text>
                            <text x="100" y="160" textAnchor="middle" fill="black">Chest</text>
                            <text x="40" y="140" textAnchor="middle" fill="black">Forearms</text>
                            <text x="160" y="140" textAnchor="middle" fill="black">Biceps</text>
                            <text x="80" y="300" textAnchor="middle" fill="black">Quads</text>
                            <text x="120" y="300" textAnchor="middle" fill="black">Quads</text>
                        </>
                    )}
                </svg>
                <div className="body-part-label">Back</div>
                <svg viewBox="0 0 200 400" className="body-svg">
                    {/* Back View */}
                    <rect x="70" y="20" width="60" height="40" fill={levelColors[levels.head]} onClick={() => handleLevelChange('head', (levels.head + 1) % 5)} />
                    <rect x="50" y="60" width="20" height="40" fill={levelColors[levels.shoulders]} onClick={() => handleLevelChange('shoulders', (levels.shoulders + 1) % 5)} />
                    <rect x="130" y="60" width="20" height="40" fill={levelColors[levels.shoulders]} onClick={() => handleLevelChange('shoulders', (levels.shoulders + 1) % 5)} />
                    <rect x="70" y="100" width="60" height="140" fill={levelColors[levels.back]} onClick={() => handleLevelChange('back', (levels.back + 1) % 5)} />
                    <rect x="50" y="100" width="20" height="80" fill={levelColors[levels.arms]} onClick={() => handleLevelChange('arms', (levels.arms + 1) % 5)} transform="rotate(15 60 140)" />
                    <rect x="130" y="100" width="20" height="80" fill={levelColors[levels.arms]} onClick={() => handleLevelChange('arms', (levels.arms + 1) % 5)} transform="rotate(-15 140 140)" />
                    <rect x="70" y="240" width="20" height="100" fill={levelColors[levels.legs]} onClick={() => handleLevelChange('legs', (levels.legs + 1) % 5)} />
                    <rect x="110" y="240" width="20" height="100" fill={levelColors[levels.legs]} onClick={() => handleLevelChange('legs', (levels.legs + 1) % 5)} />
                    {showLabels && (
                        <>
                            <text x="100" y="40" textAnchor="middle" fill="black"></text>
                            <text x="40" y="80" textAnchor="middle" fill="black">Traps</text>
                            <text x="160" y="80" textAnchor="middle" fill="black">Traps</text>
                            <text x="100" y="160" textAnchor="middle" fill="black">Back</text>
                            <text x="40" y="140" textAnchor="middle" fill="black">Tricep</text>
                            <text x="160" y="140" textAnchor="middle" fill="black">Tricep</text>
                            <text x="80" y="300" textAnchor="middle" fill="black">Hams</text>
                            <text x="120" y="300" textAnchor="middle" fill="black">Hams</text>
                        </>
                    )}
                </svg>
            </div>
        </div>
    );
};

export default Progression;