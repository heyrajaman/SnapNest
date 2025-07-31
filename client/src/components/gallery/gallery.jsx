import GalleryItem from "../galleryItem/galleryItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import Skeleton from "../skeleton/skeleton";

const fetchPins = async ({ pageParam, search, userId, boardId }) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}/pins?cursor=${pageParam}&search=${
      search || ""
    }&userId=${userId || ""}&boardId=${boardId || ""}`
  );
  return res.data;
};

const Gallery = ({ search, userId, boardId }) => {
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ["pins", search, userId, boardId],
    queryFn: ({ pageParam = 0 }) =>
      fetchPins({ pageParam, search, userId, boardId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  if (status === "pending") return <Skeleton />;
  if (status === "error") return <strong>Something went wrong ... </strong>;

  const allPins = data?.pages.flatMap((page) => page.pins) || [];

  return (
    <InfiniteScroll
      dataLength={allPins.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4 className="font-bold">Loading more pins ...</h4>}
      endMessage={<h3 className="font-bold">All Posts Loaded !</h3>}
    >
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
        {allPins?.map((item) => (
          <GalleryItem key={item._id} item={item} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Gallery;
