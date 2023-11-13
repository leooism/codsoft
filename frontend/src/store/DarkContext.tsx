import React, { useContext, useState } from "react";

type darkModeContextType = {
	isDarkMode: boolean;
	toggleDarkMode: () => void;
};
const darkModeContext = React.createContext<darkModeContextType>(
	{} as darkModeContextType
);
const useDarkMode = () => useContext(darkModeContext);

const DarkModeProvider = ({ children }: { children: React.ReactNode }) => {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const toggleDarkMode = () => setIsDarkMode((p) => !p);
	return (
		<darkModeContext.Provider
			value={{ isDarkMode: isDarkMode, toggleDarkMode }}
		>
			{children}
		</darkModeContext.Provider>
	);
};

export { useDarkMode, DarkModeProvider };
