import { Link } from "react-router-dom";
import Image from "../image/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";
import useAuthStore from "../../utils/authStore";

const interact = async (id, type) => {
  const res = await apiRequest.post(`/pins/interact/${id}`, { type });
  return res.data;
};

const GalleryItem = ({ item }) => {
  const optimizedHeight = (372 * item.height) / item.width;
  const queryClient = useQueryClient();
  const { currentUser } = useAuthStore();

  const { data, isPending } = useQuery({
    queryKey: ["interactionCheck", item._id],
    queryFn: () =>
      apiRequest
        .get(`/pins/interaction-check/${item._id}`)
        .then((res) => res.data),
    enabled: !!currentUser,
    staleTime: 60 * 1000,
  });

  const mutation = useMutation({
    mutationFn: ({ id, type }) => interact(id, type),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["interactionCheck", item._id],
      });
      if (currentUser) {
        queryClient.invalidateQueries({
          queryKey: ["savedPins", currentUser._id],
        });
      }
    },
  });

  const handleSaveClick = (e) => {
    e.stopPropagation();
    if (!currentUser) {
      alert("Please log in to save pins!");
      return;
    }
    mutation.mutate({ id: item._id, type: "save" });
  };

  return (
    <div
      className="flex relative group"
      style={{ gridRowEnd: `span ${Math.ceil(item.height / 100)}` }}
    >
      <Image
        src={item.media}
        alt=""
        w={372}
        h={optimizedHeight}
        className="rounded-lg object-cover w-full"
      />

      <Link
        to={`/pin/${item._id}`}
        className="hidden group-hover:block
           absolute inset-0
           bg-black bg-opacity-30
           rounded-[16px]"
      />
      <button
        onClick={handleSaveClick}
        disabled={mutation.isPending || (isPending && !!currentUser)}
        className="hidden group-hover:block
           bg-[#3fbccc] text-white
           rounded-[20px]
           py-1 px-3
           font-medium cursor-pointer
           w-max absolute top-4 right-4
           border-none
           disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {data?.isSaved ? "Saved" : "Save"}
      </button>
    </div>
  );
};

export default GalleryItem;
