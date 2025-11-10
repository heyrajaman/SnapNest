import Image from "../image/image";
import { format } from "timeago.js";

const Comment = ({ comment }) => {
  return (
    <div className="flex gap-4">
      <Image
        src={comment.user.img || "/general/noAvatar.png"}
        alt=""
        className="w-8 h-8 rounded-full object-cover"
      />
      <div className="flex flex-col gap-1">
        <span className="ont-medium text-sm">{comment.user.displayName}</span>
        <p className="text-sm">{comment.description}</p>
        <span className="text-xs text-[#a6a6a6]">
          {format(comment.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default Comment;
