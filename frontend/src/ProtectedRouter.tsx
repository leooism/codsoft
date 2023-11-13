import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "./store/UserContext";

export const ProtectedRouter = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	// const [cookies, setCookie] = useCookies(["jwt"]);
	const { email } = useUserContext();
	// const navigate = useNavigate();
	if (!email) return <Navigate to="/" />;
	return <>{children}</>;
};
