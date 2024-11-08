import React, { useState } from 'react';
import '../styles/components.css';

const diets = {
    keto: {
        name: "Keto Diet",
        description: "A low-carb, high-fat diet.",
        recipes: {
            breakfast: {
                name: "Keto Pancakes",
                ingredients: ["Almond flour", "Eggs", "Cream cheese", "Butter"],
                instructions: "Mix all ingredients and cook on a skillet."
            },
            lunch: {
                name: "Keto Salad",
                ingredients: ["Lettuce", "Chicken", "Avocado", "Olive oil"],
                instructions: "Mix all ingredients and serve."
            },
            dinner: {
                name: "Keto Steak",
                ingredients: ["Steak", "Butter", "Garlic", "Herbs"],
                instructions: "Cook steak in butter with garlic and herbs."
            }
        }
    },
    vegan: {
        name: "Vegan Diet",
        description: "A plant-based diet.",
        recipes: {
            breakfast: {
                name: "Vegan Smoothie",
                ingredients: ["Banana", "Spinach", "Almond milk", "Chia seeds"],
                instructions: "Blend all ingredients until smooth."
            },
            lunch: {
                name: "Vegan Wrap",
                ingredients: ["Tortilla", "Hummus", "Veggies", "Avocado"],
                instructions: "Spread hummus on tortilla, add veggies and avocado, and wrap."
            },
            dinner: {
                name: "Vegan Stir-fry",
                ingredients: ["Tofu", "Broccoli", "Soy sauce", "Ginger"],
                instructions: "Stir-fry tofu and broccoli with soy sauce and ginger."
            }
        }
    },
    paleo: {
        name: "Paleo Diet",
        description: "A diet based on the types of foods presumed to have been eaten by early humans.",
        recipes: {
            breakfast: {
                name: "Paleo Omelette",
                ingredients: ["Eggs", "Spinach", "Mushrooms", "Tomatoes"],
                instructions: "Cook eggs with spinach, mushrooms, and tomatoes."
            },
            lunch: {
                name: "Paleo Salad",
                ingredients: ["Mixed greens", "Chicken", "Nuts", "Berries"],
                instructions: "Mix all ingredients and serve."
            },
            dinner: {
                name: "Paleo Chicken",
                ingredients: ["Chicken", "Sweet potatoes", "Olive oil", "Herbs"],
                instructions: "Bake chicken with sweet potatoes, olive oil, and herbs."
            }
        }
    },
    mediterranean: {
        name: "Mediterranean Diet",
        description: "A diet inspired by the eating habits of Greece, Southern Italy, and Spain.",
        recipes: {
            breakfast: {
                name: "Mediterranean Yogurt",
                ingredients: ["Greek yogurt", "Honey", "Nuts", "Berries"],
                instructions: "Top Greek yogurt with honey, nuts, and berries."
            },
            lunch: {
                name: "Mediterranean Salad",
                ingredients: ["Tomatoes", "Cucumbers", "Feta cheese", "Olive oil"],
                instructions: "Mix all ingredients and serve."
            },
            dinner: {
                name: "Mediterranean Fish",
                ingredients: ["Fish", "Lemon", "Olive oil", "Herbs"],
                instructions: "Bake fish with lemon, olive oil, and herbs."
            }
        }
    },
    glutenFree: {
        name: "Gluten-Free Diet",
        description: "A diet that excludes gluten.",
        recipes: {
            breakfast: {
                name: "Gluten-Free Pancakes",
                ingredients: ["Gluten-free flour", "Eggs", "Milk", "Butter"],
                instructions: "Mix all ingredients and cook on a skillet."
            },
            lunch: {
                name: "Gluten-Free Sandwich",
                ingredients: ["Gluten-free bread", "Turkey", "Lettuce", "Tomato"],
                instructions: "Assemble sandwich with turkey, lettuce, and tomato."
            },
            dinner: {
                name: "Gluten-Free Pasta",
                ingredients: ["Gluten-free pasta", "Tomato sauce", "Ground beef", "Parmesan"],
                instructions: "Cook pasta and mix with tomato sauce and ground beef. Top with Parmesan."
            }
        }
    }
};

const Diet = () => {
    const [selectedDiet, setSelectedDiet] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);

    const handleDietClick = (diet) => {
        setSelectedDiet(diet);
        setShowOverlay(true);
    };

    const closeOverlay = () => {
        setShowOverlay(false);
    };

    return (
        <div className="diet-page">
            <div className="diet-options">
                {Object.keys(diets).map((key) => (
                    <div key={key} className="diet-box" onClick={() => handleDietClick(diets[key])}>
                        <h2>{diets[key].name}</h2>
                        <br></br>
                        <p>{diets[key].description}</p>
                    </div>
                ))}
            </div>
            {showOverlay && selectedDiet && (
                <div className="overlay">
                    <div className="overlay-content">
                        <h2>{selectedDiet.name} Recipes</h2>
                        {Object.keys(selectedDiet.recipes).map((meal) => (
                            <div key={meal} className="meal">
                                <h3>{selectedDiet.recipes[meal].name}</h3>
                                <h4>Ingredients:</h4>
                                <ul>
                                    {selectedDiet.recipes[meal].ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>
                                <h4>Instructions:</h4>
                                <p>{selectedDiet.recipes[meal].instructions}</p>
                            </div>
                        ))}
                        <button onClick={closeOverlay}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Diet;