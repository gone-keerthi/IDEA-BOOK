import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { CiCircleCheck } from "react-icons/ci";
const Success = () => {
  
  const [showAlert, setShowAlert] = useState(false);
  const [closeContainer, setCloseContainer] = useState(true);

  const handleCloseContainer = () => {
    setCloseContainer(false);
  }
  const handleShare = () => {
    const CopyLink = document.getElementById("input");
    // CopyLink.Select();
    // CopyLink.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(CopyLink.innerText);
    setShowAlert(true);

    setTimeout(() => {
        setShowAlert(false);
    }, 4000);

  };

  const handleClose = () => {
    setShowAlert(false)
  };
 
  
  return (
    <div className="container">
        { closeContainer && (
      <div className="success-message-container">
        <FiX onClick={handleCloseContainer} />
        <p>Congrats your Quiz is Published!</p>
        <p id="input"> Your link is here </p>
        <button id="share-btn" onClick={handleShare}>
          Share
        </button>
      </div> 
        )}

      {showAlert && (
        <div className="alert-message">
          <CiCircleCheck />
          <span>Link copied to Clipboard</span>
          <FiX onClick={handleClose}/>
        </div>
      )}
    </div>
  );
};

export default Success;
