import Image from "../../components/image/image";
import PostInteractions from "../../components/postInteractions/postInteractions";
import Comments from "../../components/comments/comments";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isPending, error, data } = useQuery({
    queryKey: ["pin", id],
    queryFn: () => apiRequest.get(`/pins/${id}`).then((res) => res.data),
  });

  if (isPending) return <strong>Loading ... </strong>;

  if (error) return "An error has occurred: " + error.message;

  if (!data) return <strong>Pin not found .. </strong>;

  return (
    <div className="flex justify-center gap-8">
      <svg
        onClick={() => navigate("/")}
        height="20"
        viewBox="0 0 24 24"
        width="20"
        style={{ cursor: "pointer" }}
      >
        <path d="M8.41 4.59a2 2 0 1 1 2.83 2.82L8.66 10H21a2 2 0 0 1 0 4H8.66l2.58 2.59a2 2 0 1 1-2.82 2.82L1 12z"></path>
      </svg>

      <div className="w-[65%] max-h-[560px] flex border border-[#e9e9e9] rounded-[32px] overflow-hidden max-[1127px]:w-full max-[1127px]:mr-4 max-[751px]:flex-col max-[751px]:max-h-none">
        <div className="flex-1 bg-[#c8bcaf]">
          <Image
            src={data.media}
            alt=""
            w={736}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 h-full flex flex-col gap-8 p-4 overflow-hidden">
          <PostInteractions postId={id} />
          <Link
            to={`/profile/${data.user.username}`}
            className="flex items-center gap-2"
          >
            <Image
              src={data.user.img || "/general/noAvatar.png"}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm">{data.user.displayName}</span>
          </Link>
          <Comments id={data._id} />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
