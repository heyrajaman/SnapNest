import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import GalleryItem from "../galleryItem/galleryItem";
import Skeleton from "../skeleton/skeleton";

const fetchSavedPins = async (userId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}/users/${userId}/saved`
  );
  return res.data;
};

const SavedGallery = ({ userId }) => {
  const { data, status } = useQuery({
    queryKey: ["savedPins", userId],
    queryFn: () => fetchSavedPins(userId),
    enabled: !!userId,
  });

  if (status === "pending") return <Skeleton />;
  if (status === "error") return <strong>Something went wrong ... </strong>;

  return (
    <div
      className="grid
      gap-4
      grid-auto-rows-[5px]
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      2xl:grid-cols-6
      3xl:grid-cols-7"
    >
      {data?.map((item) => (
        <GalleryItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default SavedGallery;
