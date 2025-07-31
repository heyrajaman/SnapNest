import { Link } from "react-router-dom";
import Image from "../image/image";

const LeftBar = () => {
  return (
    <div className="flex flex-col items-center justify-between w-[56px] h-screen sticky top-0 py-4 border-r border-[#e9e9e9]">
      <div className="flex flex-col items-center gap-6">
        <Link to="/" className="w-12 h-12 flex items-center justify-center">
          <Image src="/general/logo2.png" alt="" className="w-12 h-12" />
        </Link>

        <Link to="/" className="w-12 h-12 flex items-center justify-center">
          <Image src="/general/home.svg" alt="" className="w-6 h-6" />
        </Link>

        <Link
          to="/create"
          className="w-12 h-12 flex items-center justify-center"
        >
          <Image src="/general/create.svg" alt="" className="w-6 h-6" />
        </Link>

        <Link to="/" className="w-12 h-12 flex items-center justify-center">
          <Image src="/general/updates.svg" alt="" className="w-6 h-6" />
        </Link>

        <Link to="/" className="w-12 h-12 flex items-center justify-center">
          <Image src="/general/messages.svg" alt="" className="w-6 h-6" />
        </Link>
      </div>
      <Link to="/" className="w-12 h-12 flex items-center justify-center">
        <Image src="/general/settings.svg" alt="" className="w-6 h-6" />
      </Link>
    </div>
  );
};

export default LeftBar;
