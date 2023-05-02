import Button from "@components/button";
import { signOutUser } from "@utils/firebase/auth";
import { useAuthUser } from "@utils/store";
import { NavLink, Navigate, Outlet } from "react-router-dom";

const Profile = () => {
  const user = useAuthUser((state) => state.user);

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  const abreviation = (user.displayName || "")
    .split(" ")
    .reduce((p, c, i) => (i < 2 ? p + c[0].toUpperCase() : p), "");

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="mb-12 font-header">Profile</h1>
        <Button variant="danger" onClick={signOutUser}>
          Log Out
        </Button>
      </div>
      <div className="grid grid-cols-3">
        <div className="flex flex-col">
          <span className="mb-2 inline-flex h-[90px] w-[90px] items-center justify-center rounded-[100px] bg-slate-200 text-3xl font-bold text-slate-600">
            {abreviation}
          </span>
          <span className="text-xl font-bold">{user?.displayName}</span>
          <span>{user?.email}</span>
          <hr className="my-6" />
          <ul>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "py-2 text-xl font-medium text-sky-700"
                    : "py-2 text-xl"
                }
                end
              >
                Personal Information
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile/billing"
                className={({ isActive }) =>
                  isActive
                    ? "py-2 text-xl font-medium text-sky-700"
                    : "py-2 text-xl"
                }
              >
                Billing & Payments
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile/orders"
                className={({ isActive }) =>
                  isActive
                    ? "py-2 text-xl font-medium text-sky-700"
                    : "py-2 text-xl"
                }
              >
                Orders
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="col-span-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
