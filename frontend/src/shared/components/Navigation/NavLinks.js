import React from "react";
import { NavLink } from "react-router-dom";
import './NavLinks.css';
import {FaSearch, FaClipboardList, FaPlus} from "react-icons/fa"

const NavLinks = props => {
    return <ul className="nav-links">
        <li>
            <NavLink to="/" exact><FaClipboardList/> All Recipes</NavLink>
        </li>
        <li>
            <NavLink to="/recipes/new"><FaPlus/> Add Recipes</NavLink>
        </li>
        <li>
            <NavLink to="/recipes/search"><FaSearch/> Search</NavLink>
        </li>
    </ul>
};

export default NavLinks;