import { useState } from "react";
import Image from "../image/image";
import apiRequest from "../../utils/apiRequest";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../utils/authStore";

const UserButton = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  // const currentUser = true;
  const { currentUser, removeCurrentUser } = useAuthStore();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/users/auth/logout", {});
      removeCurrentUser();
      navigate("/auth");
    } catch (err) {
      console.log(err);
    }
  };

  return currentUser ? (
    <div className="relative hidden max-[475px]:hidden sm:flex items-center gap-4">
      <Image
        src={currentUser.img || "/general/noAvatar.png"}
        alt="user"
        className="w-10 h-10 object-cover rounded-full"
      />
      <Image
        onClick={() => setOpen((prev) => !prev)}
        src="/general/arrow.svg"
        alt="user"
        className="w-4 h-4 cursor-pointer"
      />
      {open && (
        <div className="absolute top-[120%] right-0 z-[999] bg-white p-4 rounded-lg shadow-md flex flex-col text-sm">
          <Link
            to={`/profile/${currentUser.username}`}
            className="p-2 rounded-lg hover:bg-gray-100 hover:text-gray-500 cursor-pointer"
          >
            Profile
          </Link>
          <div className="p-2 rounded-lg hover:bg-gray-100 hover:text-gray-500 cursor-pointer">
            Setting
          </div>
          <div
            onClick={handleLogout}
            className="p-2 rounded-lg hover:bg-gray-100 hover:text-gray-500 cursor-pointer"
          >
            Logout
          </div>
        </div>
      )}
    </div>
  ) : (
    <Link
      to="/auth"
      className="text-lg px-4 py-2 rounded-full hover:bg-gray-100 transition"
    >
      Login / Sign Up
    </Link>
  );
};

export default UserButton;
