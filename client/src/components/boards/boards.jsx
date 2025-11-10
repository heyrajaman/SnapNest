import { useQuery } from "@tanstack/react-query";
import Image from "../image/image";
import apiRequest from "../../utils/apiRequest";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

const Boards = ({ userId }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["boards", userId],
    queryFn: () => apiRequest.get(`/boards/${userId}`).then((res) => res.data),
  });

  if (isPending) return <strong>Loading ...</strong>;

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="w-full grid grid-cols-7 gap-4">
      {data?.map((board) => (
        <Link
          to={`/search?boardId=${board._id}`}
          key={board._id}
          className="mb-8 cursor-pointer"
        >
          <Image
            src={board.firstPin.media}
            alt=""
            className="w-full h-full object-cover rounded-[16px]"
          />
          <div className="flex flex-col gap-1">
            <h1 className="font-medium text-[16px]">{board.title}</h1>
            <span className="text-gray-500 text-[13px] -mt-2">
              {board.pinCount} Pins • {format(board.createdAt)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Boards;
