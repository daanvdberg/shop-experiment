import Button from "@components/button";
import { signOutUser } from "@utils/firebase";
import { useAuthUser } from "@utils/store";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = useAuthUser((state) => state.user);

  if (!user) return null;

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
              <Link
                to="/profile"
                className="py-2 text-xl font-medium text-sky-700"
              >
                Personal Information
              </Link>
            </li>
            <li>
              <Link to="/profile/billing" className="py-2 text-xl">
                Billing & Payments
              </Link>
            </li>
            <li>
              <Link to="/profile/orders" className="py-2 text-xl">
                Orders
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-2">
          <h2 className="text-medium font-header text-3xl">
            Personal Information
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Profile;
