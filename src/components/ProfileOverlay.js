import React, { useState, useEffect, useRef } from 'react';

function ProfileOverlay({ onClose, updateProfileImage, userInfo }) {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (isCameraOpen) {
      const video = videoRef.current;
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
          video.srcObject = stream;
          video.play();
        });
      }
    }
  }, [isCameraOpen]);

  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/png');
    setImageSrc(dataUrl);
    updateProfileImage(dataUrl);
    closeCamera();
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="user-details">
          <h2>User Details</h2>
          <p><strong>Name:</strong> {userInfo.name}</p>
          <p><strong>Age:</strong> {userInfo.age}</p>
          <p><strong>Current Weight:</strong> {userInfo.currentWeight} kg</p>
          <p><strong>Goal Weight:</strong> {userInfo.goalWeight} kg</p>
          <p><strong>Height:</strong> {userInfo.currentHeight} cm</p>
          <p><strong>Goal Type:</strong> {userInfo.goalType}</p>
        </div>
        {isCameraOpen ? (
          <div>
            <video ref={videoRef} style={{ width: '100%' }} />
            <button onClick={captureImage}>Capture</button>
            <button onClick={closeCamera}>Close Camera</button>
          </div>
        ) : (
          <div>
            <button onClick={openCamera}>Open Camera</button>
            {imageSrc && <img src={imageSrc} alt="Profile" />}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileOverlay;