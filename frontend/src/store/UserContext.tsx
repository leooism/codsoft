import React, { useContext, useReducer } from "react";

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

const initalData = {
	_id: "",
	email: "",
	fullName: "",
	profileImage: "",
	setUser: () => {},
	role: "",
};
const userContext = React.createContext<userContextType>({} as userContextType);

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

	return (
		<userContext.Provider value={{ ...data, setUser }}>
			{children}
		</userContext.Provider>
	);
};

const useUserContext = () => useContext(userContext);

export { useUserContext, UserContextProvider };
