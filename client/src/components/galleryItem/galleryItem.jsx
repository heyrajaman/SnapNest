import { Link } from "react-router-dom";
import Image from "../image/image";

const GalleryItem = ({ item }) => {
  const optimizedHeight = (372 * item.height) / item.width;

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
        className="hidden group-hover:block
           bg-[#3fbccc] text-white
           rounded-[20px]
           py-1 px-3
           font-medium cursor-pointer
           w-max absolute top-4 right-4
           border-none"
      >
        Save
      </button>
      <div
        className="hidden group-hover:flex
           absolute bottom-4 right-4
           items-center gap-2"
      >
        <button
          className="w-8 h-8
             rounded-full
             bg-white
             flex items-center justify-center
             border-none cursor-pointer
             hover:bg-gray-100"
        >
          <Image src="/general/share.svg" alt="" className="w-5 h-5" />
        </button>
        <button
          className="w-8 h-8
             rounded-full
             bg-white
             flex items-center justify-center
             border-none cursor-pointer
             hover:bg-gray-100"
        >
          <Image src="/general/more.svg" alt="" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default GalleryItem;
