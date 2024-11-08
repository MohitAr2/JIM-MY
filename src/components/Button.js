import React, { useState } from 'react';
import '../styles/components.css';

const initialFriends = [
    { name: "John Doe" },
    { name: "Jane Smith" },
    { name: "Alice Johnson" },
    { name: "Bob Brown" }
];

const Button = ({ onAddFriend }) => {
    const [friends, setFriends] = useState(initialFriends);
    const [newFriend, setNewFriend] = useState("");
    const [showOverlay, setShowOverlay] = useState(false);

    const handleAddFriend = () => {
        if (newFriend.trim() !== "") {
            const updatedFriends = [...friends, { name: newFriend }];
            setFriends(updatedFriends);
            setNewFriend("");
            onAddFriend(updatedFriends);
        }
    };

    const handleInputChange = (event) => {
        setNewFriend(event.target.value);
    };

    const openOverlay = () => {
        setShowOverlay(true);
    };

    const closeOverlay = () => {
        setShowOverlay(false);
    };

    return (
        <div className="button-page">
            <button className="add-friend-button" onClick={openOverlay}>Add Friend</button>
            {showOverlay && (
                <div className="overlay">
                    <div className="overlay-content">
                        <h2>Add a Friend</h2>
                        <input
                            type="text"
                            value={newFriend}
                            onChange={handleInputChange}
                            placeholder="Enter friend's name"
                        />
                        <button onClick={handleAddFriend}>Add</button>
                        <button onClick={closeOverlay}>Close</button>
                        <h3>Friends List</h3>
                        <ul>
                            {friends.map((friend, index) => (
                                <li key={index}>{friend.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Button;