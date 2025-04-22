import React from "react";


const DarkMode = () => {
    const [theme, setTheme] = React.useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
    );

    const element = document.documentElement; // html element

    React.useEffect(() => {
        if (theme === "dark") {
            element.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            element.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [theme]);

    return (
        <div className="relative">
            <img
                src="https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/clothes/light-mode-button.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbG90aGVzL2xpZ2h0LW1vZGUtYnV0dG9uLnBuZyIsImlhdCI6MTc0Mzc0NzAyNSwiZXhwIjoxNzc1MjgzMDI1fQ.cl2nBpR7HL90Sznv85H_X-jWKK7DoKlMy8R9YfDMomA"
                alt=""
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className={`w-12 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300 absolute right-0 z-10 ${theme === "dark" ? "opacity-0" : "opacity-100"
                    } `}
            />
            <img
                src="https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/clothes/dark-mode-button.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbG90aGVzL2RhcmstbW9kZS1idXR0b24ucG5nIiwiaWF0IjoxNzQzNzQ2OTg5LCJleHAiOjE3NzUyODI5ODl9.jrLW5lBIqz0y1eraZujXb2F4yGcjZKsxN0_G_EMLp48"
                alt=""
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="w-12 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300"
            />
        </div>
    );
};

export default DarkMode;