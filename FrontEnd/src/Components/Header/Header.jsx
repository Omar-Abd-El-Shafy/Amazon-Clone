import React from "react";
import "./Header.css";
import image from "../../Assets/imgs/logo/amazon_logo.png";
import Search from "./Search/Search";
import Cart from "./Cart/Cart";

function Header() {
    return (
        <div className="">
            <div className="Header d-flex align-items-center justify-content-between">
                <a href="/">
                    <img src={image} alt="logo" className="logo" />
                </a>
                <Search />
                <Cart />
            </div>
        </div>
    );
}

export default Header;
