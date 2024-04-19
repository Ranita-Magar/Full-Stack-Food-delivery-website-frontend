import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="Header">
      <div className="header-content">
        <h2>Order your favourite food here</h2>
        <p>
          Choose from a diverse menu featuring a delectale array of dishes
          craftd with the finest ingredients and elevate your dining experience,
          one delicioous meal at a time.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
