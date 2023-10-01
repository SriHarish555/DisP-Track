import { useState } from "react";
import "../App.css";
import ConnectWallet from "./ConnectWallet";
import { useNavigate } from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate("/DisP-Track/");
  };

  return (
    <>
      <div className="nav">
        <button className="home-button" onClick={handleClick}>
          <img src="disptrackLogo.svg" className="nav--logo" />
        </button>
        <div className="nav--buttons">
          <ConnectWallet />
          {/*<a href=""><img src="profile.png" className="nav--profile"/></a>*/}
        </div>
      </div>
    </>
  );
}

export default Navbar;
