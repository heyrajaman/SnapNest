import { useState } from "react";
import Image from "../../components/image/image";
import Gallery from "../../components/gallery/gallery";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";
import Boards from "../../components/boards/boards";
import FollowButton from "./FollowButton";

const ProfilePage = () => {
  const [type, setType] = useState("saved");

  const { username } = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ["profile", username],
    queryFn: () => apiRequest.get(`/users/${username}`).then((res) => res.data),
  });

  if (isPending) return <strong>Loading ... </strong>;

  if (error) return "An error has occurred: " + error.message;

  if (!data) return <strong>User not found .. </strong>;

  return (
    <div className="flex flex-col items-center gap-2 pt-2">
      <Image
        src={data.img || "general/noAvatar.png"}
        alt=""
        className="rounded-full object-cover w-30 h-30"
      />
      <h1 className="text-xl font-medium">{data.displayName}</h1>
      <span className="font-light text-gray-500">@{data.username}</span>
      <div className="font-medium">
        {data.followerCount} followers • {data.followingCount} followings
      </div>
      <div className="flex items-center gap-8">
        <Image src="/general/share.svg" alt="" className="w-6 h-6" />
        <div className="flex gap-4">
          <button className="border-none px-4 py-2 rounded-full font-bold cursor-pointer bg-gray-100 hover:bg-gray-200">
            Message
          </button>
          <FollowButton
            isFollowing={data.isFollowing}
            username={data.username}
          />
        </div>
        <Image src="/general/more.svg" alt="" className="w-6 h-6" />
      </div>
      <div className="flex gap-4 mt-8 mb-4 font-medium">
        <span
          onClick={() => setType("created")}
          className={`cursor-pointer py-2 ${
            type === "created"
              ? "border-b-4 border-black"
              : "hover:text-gray-500"
          }`}
        >
          Created
        </span>
        <span
          onClick={() => setType("saved")}
          className={`cursor-pointer py-2 ${
            type === "saved" ? "border-b-4 border-black" : "hover:text-gray-500"
          }`}
        >
          Saved
        </span>
      </div>
      {type === "created" ? (
        <Gallery userId={data._id} />
      ) : (
        <Boards userId={data._id} />
      )}
    </div>
  );
};

export default ProfilePage;
