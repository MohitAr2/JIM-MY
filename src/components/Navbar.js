// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileOverlay from './ProfileOverlay';
import profileImage from './assests/profile.png';
import '../styles/components.css';

const Navbar = () => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [profileImg, setProfileImg] = useState(profileImage);
    const [contributorName, setContributorName] = useState('John Doe');

    const toggleOverlay = () => {
        setIsOverlayOpen(!isOverlayOpen);
    };

    const updateProfileImage = (newImage) => {
        setProfileImg(newImage);
    };

    return (
        <>
            <nav className="navbar">
                <div className="container nav-container">
                    <input className="checkbox" type="checkbox" name="" id="" />
                    <div className="hamburger-lines">
                        <span className="line line1"></span>
                        <span className="line line2"></span>
                        <span className="line line3"></span>
                    </div>
                    <div className="logo">
                        <Link to="/" className="logo">jim❚█══█❚jim</Link>
                    </div>
                    <div className="menu-items">
                        <li><Link to="/leaderboard">Leaderboard</Link></li>
                        <li><Link to="/workout-logs">Workout Logs</Link></li>
                        <li><Link to="/progression">Progression</Link></li>
                        <li><Link to="/diet">Diet</Link></li>
                        {/* <div className="buy-me-coffee">
                            <p>Buy me a coffee</p>
                            <p>Contributor: {contributorName}</p>
                        </div> */}
                    </div>
                    <div className="profile" onClick={toggleOverlay}>
                        <img src={profileImg} alt="User Profile" />
                    </div>
                </div>
            </nav>
            {isOverlayOpen && <ProfileOverlay onClose={toggleOverlay} updateProfileImage={updateProfileImage} />}
        </>
    );
};

export default Navbar;