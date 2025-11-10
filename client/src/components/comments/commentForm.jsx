import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import apiRequest from "../../utils/apiRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const addComment = async (comment) => {
  const res = await apiRequest.post("/comments", comment);
  return res.data;
};

const CommentForm = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState("");

  const handleEmojiClick = (emoji) => {
    setDesc((prev) => prev + " " + emoji.emoji);
    setOpen(false);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
      setDesc("");
      setOpen(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    mutation.mutate({
      description: desc,
      pin: id,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#f1f1f1] p-4 rounded-[28px] flex items-center gap-4"
    >
      <input
        type="text"
        placeholder="Add a comment"
        className="flex-1 border-none outline-none bg-transparent text-base"
        onChange={(e) => setDesc(e.target.value)}
        value={desc}
      />
      <div className="cursor-pointer text-[20px] relative">
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="cursor-pointer text-[20px] relative"
        >
          😊
        </div>
        {open && (
          <div className="absolute right-0 bottom-full mb-6 w-auto bg-white rounded-xl shadow-lg z-20 transform scale-75 origin-bottom-right">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
    </form>
  );
};

export default CommentForm;
