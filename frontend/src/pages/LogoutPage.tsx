import { useEffect } from "react";
import { logout } from "../api/auth/main.api";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
    const navigate = useNavigate();
    useEffect( () => {
        const logoutProfile = async () => {
            await logout();
            navigate("/login");
        }
        logoutProfile();
    }, [])
    return ( <></> );
}
 
export default LogoutPage;