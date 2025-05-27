// src/hooks/useFilterByPermission.js
import { useSelector } from "react-redux";

const useFilterByPermission = () => {
  const { currentUser } = useSelector((state) => state.auth);

  const hasPermission = (permission) => {
    return currentUser?.permissions?.includes(permission);
  };

  const filterItemsByPermission = (items) => {
    return items.filter(
      (item) => !item.permission || hasPermission(item.permission)
    );
  };

  return { hasPermission, filterItemsByPermission };
};

export default useFilterByPermission;
