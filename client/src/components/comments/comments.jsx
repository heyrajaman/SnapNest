import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";
import Comment from "./comment";
import CommentForm from "./commentForm";

const Comments = ({ id }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => apiRequest.get(`/comments/${id}`).then((res) => res.data),
  });

  if (isPending) return <strong>Loading ...</strong>;

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="flex-1 flex flex-col gap-4 min-h-0">
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
        <span className="commentCount">
          {data.length === 0 ? "No comments" : data.length + " Comments"}
        </span>
        {data.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
      <CommentForm id={id} />
    </div>
  );
};

export default Comments;
