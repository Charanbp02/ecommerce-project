import React, { useState } from 'react';
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FaCaretDown, FaBars, FaTimes } from "react-icons/fa";
import DarkMode from "./DarkMode";

const Menu = [
    { id: 1, name: "Home", link: "/#" },
    { id: 2, name: "Top Rated", link: "/#services" },
    { id: 3, name: "Kids Wear", link: "/#" },
    { id: 4, name: "Mens Wear", link: "/#" },
    { id: 5, name: "Electronics", link: "/#" },
];

const DropdownLinks = [
    { id: 1, name: "Trending Products", link: "/#" },
    { id: 2, name: "Best Selling", link: "/#" },
    { id: 3, name: "Top Rated", link: "/#" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // New state for dropdown

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        if (isOpen) setIsDropdownOpen(false); // Close dropdown when menu closes
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className='shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40'>
            {/* Upper Navbar */}
            <div className='bg-primary/40 py-3'>
                <div className='container flex justify-between items-center px-4'>
                    <div>
                        <a href="#" className='font-bold text-2xl sm:text-3xl flex gap-2 items-center'>
                            <img
                                src="https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/clothes/logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbG90aGVzL2xvZ28ucG5nIiwiaWF0IjoxNzQzNjc5MDkyLCJleHAiOjE3NzUyMTUwOTJ9.5iu3wayd4jpK-_qc58Cj5JQLe5peP8a5MnYX6VAWJMU"
                                alt="Logo"
                                className='w-10'
                            />
                            <span className="hidden sm:block">Trend Zone</span>
                            <span className="block sm:hidden">Trend Zone</span>
                        </a>
                    </div>

                    {/* Desktop Search and Buttons */}
                    <div className='hidden md:flex items-center gap-4'>
                        <div className="relative group flex items-center">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-[200px] group-hover:w-[250px] transition-all duration-300 rounded-full border border-gray-300 px-3 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800"
                            />
                            <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
                        </div>

                        <button
                            onClick={() => alert("Ordering not available yet")}
                            className="bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group"
                        >
                            <span className="group-hover:block hidden transition-all duration-200">Order</span>
                            <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
                        </button>

                        <DarkMode />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className='md:hidden flex items-center gap-4'>
                        <DarkMode />
                        <button onClick={toggleMenu} className="text-2xl">
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar */}
            <div className="md:hidden px-4 py-2">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full transition-all duration-300 rounded-full border border-gray-300 px-3 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800"
                    />
                    <IoMdSearch className="text-gray-500 absolute top-1/2 -translate-y-1/2 right-3" />
                </div>
            </div>

            {/* Navigation Menu */}
            <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>
                <ul className='md:flex md:items-center justify-center flex-col md:flex-row bg-white dark:bg-gray-900 w-full'>
                    {Menu.map((data) => (
                        <li key={data.id} className="md:inline-block">
                            <a
                                href={data.link}
                                className='block px-4 py-2 hover:text-primary duration-200 md:inline-block'
                                onClick={() => {
                                    setIsOpen(false);
                                    setIsDropdownOpen(false); // Close dropdown when clicking a menu item
                                }}
                            >
                                {data.name}
                            </a>
                        </li>
                    ))}

                    {/* Dropdown */}
                    <li className="group relative md:inline-block">
                        <a
                            href="#"
                            className="flex items-center gap-[2px] px-4 py-2 hover:text-primary duration-200"
                            onClick={(e) => {
                                e.preventDefault(); // Prevent default link behavior
                                toggleDropdown(); // Toggle dropdown in mobile view
                            }}
                        >
                            Trending Products
                            <span>
                                <FaCaretDown
                                    className={`transition-all duration-200 ${
                                        isDropdownOpen ? 'rotate-180' : ''
                                    } md:group-hover:rotate-180`}
                                />
                            </span>
                        </a>
                        <div
                            className={`md:absolute md:z-[9999] w-full md:w-[200px] rounded-md bg-white dark:bg-gray-900 md:p-2 text-black dark:text-white shadow-md md:shadow-lg ${
                                isDropdownOpen ? 'block' : 'hidden'
                            } md:hidden md:group-hover:block`}
                        >
                            <ul>
                                {DropdownLinks.map((data) => (
                                    <li key={data.id}>
                                        <a
                                            href={data.link}
                                            className='block px-4 py-2 md:rounded-md hover:bg-primary/20'
                                            onClick={() => {
                                                setIsOpen(false);
                                                setIsDropdownOpen(false); // Close dropdown and menu
                                            }}
                                        >
                                            {data.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>

                    {/* Mobile Order Button */}
                    <li className="md:hidden px-4 py-2">
                        <button
                            onClick={() => {
                                alert("Ordering not available yet");
                                setIsOpen(false);
                                setIsDropdownOpen(false); // Close dropdown when ordering
                            }}
                            className="bg-gradient-to-r from-primary to-secondary w-full text-white py-2 px-4 rounded-full flex items-center justify-center gap-3"
                        >
                            <span>Order</span>
                            <FaCartShopping className="text-xl" />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;