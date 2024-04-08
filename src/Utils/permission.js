import { useSelector } from "react-redux";
export const usePermission = (permissionName, method) => {
  const customerAdmin = useSelector((state) => state.auth.user?.customerAdmin);
  const roles = useSelector((state) => state.auth.user?.roles) || [];
  try {
    if (customerAdmin) {
      return true;
    } else {
      const allowed = roles.some((role) => {
        return role.permissions.some((permission) => {
          return (
            permissionName === permission.name && permission[method] === true
          );
        });
      });
      return allowed;
    }
  } catch (e) {
    console.log("permission error", e);
  }
};
