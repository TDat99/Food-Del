import React, { useEffect } from "react";
import "./Header.css";

const Header = () => {
  useEffect(() => {
    const header = document.querySelector(".header");
    if (!header) return;

    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10; // -5 → 5
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      header.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Our food-ordering website allows users to browse delicious meals, add
          them to their cart, and place orders easily online
        </p>
        <button onClick={() => (window.location.href = "#explore-menu")}>
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
