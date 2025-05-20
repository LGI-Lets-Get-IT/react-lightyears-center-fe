import { useEffect } from "react";
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const swalOptions = {
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    backdrop: false,
    // didOpen: (toast) => {
    //   toast.addEventListener("mouseenter", Swal.stopTimer);
    //   toast.addEventListener("mouseleave", Swal.resumeTimer);
    // },
};
const ProtectedRoute = ({ requiredPermissions, children }) => {
    const { currentUser } = useSelector(state => state.auth)
    const { permissions } = currentUser || []

    useEffect(() => {
        console.log('REQUIREDPERM', permissions, requiredPermissions)
        if (currentUser && requiredPermissions && !permissions?.includes(requiredPermissions)) {
            MySwal.mixin(swalOptions).fire({
                icon: "error",
                title: "Access Denied",
                text: "You do not have permission to access that page.",

            })
        }
    }, [currentUser, permissions, requiredPermissions]);

    if (!currentUser) {
        return <Navigate to="/login" replace />
    }

    if (requiredPermissions && !permissions?.includes(requiredPermissions)) {
        return (
            <Navigate to="/" replace />
        )
    }

    return children;

}

export default ProtectedRoute;