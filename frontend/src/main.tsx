import React, { useContext, useReducer } from "react";
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
const userContext = React.createContext<userContextType>({} as userContextType);
const useUserContext = () => useContext(userContext);
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
export default useUserContext;

ReactDOM.createRoot(document.getElementById("root")!).render(
	<UserContextProvider>
		<App />
	</UserContextProvider>
);
