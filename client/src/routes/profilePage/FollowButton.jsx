import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";

const followUser = async (username) => {
  const res = await apiRequest.post(`/users/follow/${username}`);
  return res.data;
};

const FollowButton = ({ isFollowing, username }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", username] });
    },
  });
  return (
    <button
      onClick={() => mutation.mutate(username)}
      disabled={mutation.isPending}
      className="border-none px-4 py-2 rounded-full font-bold cursor-pointer bg-[#e50829] text-white hover:bg-[#c1011e] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
