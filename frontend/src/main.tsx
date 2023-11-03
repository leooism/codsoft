import React, { useContext, useReducer, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

enum setUserDispatchType {
	SET_USER,
}

export interface userType {
	_id: string;
	email: string;
	fullName: string;
	profileImage: string;
	role: string;
}

type userContextType = {
	setUser: (payload: userType) => void;
} & userType;

type actionType = {
	type: setUserDispatchType;
	payload: userType;
};
type darkModeContextType = {
	isDarkMode: boolean;
	toogleDarkMode: () => void;
};
const userContext = React.createContext<userContextType>({} as userContextType);
const darkModeContext = React.createContext<darkModeContextType>(
	{} as darkModeContextType
);
const useUserContext = () => useContext(userContext);
const useDarkMode = () => useContext(darkModeContext);
const initalData = {
	_id: "",
	email: "",
	fullName: "",
	profileImage: "",
	setUser: () => {},
	role: "",
};

const userReducer = (
	state: userContextType,
	action: actionType
): userContextType => {
	switch (action.type) {
		case setUserDispatchType.SET_USER:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};
const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [data, dispatch] = useReducer(userReducer, initalData);

	const setUser = (user: userType) => {
		dispatch({
			type: setUserDispatchType.SET_USER,
			payload: user,
		});
	};

	console.log(data);
	return (
		<userContext.Provider value={{ ...data, setUser }}>
			{children}
		</userContext.Provider>
	);
};

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
export { useUserContext, useDarkMode };

ReactDOM.createRoot(document.getElementById("root")!).render(
	<DarkModeProvider>
		<UserContextProvider>
			<App />
		</UserContextProvider>
	</DarkModeProvider>
);
