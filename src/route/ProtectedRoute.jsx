import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const ProtectedRoute = ({ requiredPermissions, children }) => {
    const { currentUser } = useSelector(state => state.auth)
    const { permissions } = currentUser || []

    if (!currentUser) {
        return <Navigate to="/login" replace />
    }

    console.log('USER PERMISSIONS', permissions, requiredPermissions)

    if (requiredPermissions && !requiredPermissions.includes(permissions)) {
        return (
            MySwal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
                backdrop: false,
              }).fire({
                icon: "error",
                title: "You are not allowed to access!",
              }),
            <Navigate to="/" replace />
        )
    }

    return children;

}

export default ProtectedRoute;