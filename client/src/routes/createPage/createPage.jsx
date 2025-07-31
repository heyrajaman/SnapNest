import IKImage from "../../components/image/image";
import useAuthStore from "../../utils/authStore";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Editor from "../../components/editor/editor";
import useEditorStore from "../../utils/editorStore";
import apiRequest from "../../utils/apiRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import BoardForm from "./BoardForm";

const addPost = async (post) => {
  const res = await apiRequest.post("/pins", post);
  return res.data;
};

const CreatePage = () => {
  const { currentUser } = useAuthStore();
  const navigate = useNavigate();
  const formRef = useRef();
  const { textOptions, canvasOptions, resetStore } = useEditorStore();

  const [file, setFile] = useState(null);
  const [previewImg, setPreviewImg] = useState({
    url: "",
    width: 0,
    height: 0,
  });
  const [isEditing, setIsEditing] = useState(false);

  const [newBoard, setNewBoard] = useState("");
  const [isNewBoardOpen, setIsNewBoardOpen] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth");
    }
  }, [navigate, currentUser]);

  useEffect(() => {
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setPreviewImg({
          url: URL.createObjectURL(file),
          width: img.width,
          height: img.height,
        });
      };
    }
  }, [file]);

  const mutation = useMutation({
    mutationFn: addPost,
    onSuccess: (data) => {
      resetStore();
      navigate(`/pin/${data._id}`);
    },
  });

  const handleSubmit = async () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      const formData = new FormData(formRef.current);
      formData.append("media", file);
      formData.append("textOptions", JSON.stringify(textOptions));
      formData.append("canvasOptions", JSON.stringify(canvasOptions));
      formData.append("newBoard", newBoard);

      mutation.mutate(formData);
    }
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["formBoards"],
    queryFn: () =>
      apiRequest.get(`/boards/${currentUser._id}`).then((res) => res.data),
    enabled: !!currentUser,
  });

  const handleNewBoard = () => {
    setIsNewBoardOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col">
      <div className="border-t border-b border-[#e9e9e9] py-1 flex items-center justify-between">
        <h1 className="text-[20px] font-medium">
          {isEditing ? "Design your Pin" : "Create Pin"}
        </h1>
        <button
          onClick={handleSubmit}
          className="bg-[#3fbccc] hover:bg-[#c1011e] text-white font-medium border-none outline-none px-2 py-2 rounded-full cursor-pointer text-[12px]"
        >
          {isEditing ? "Done" : "Publish"}
        </button>
      </div>
      {isEditing ? (
        <Editor previewImg={previewImg} />
      ) : (
        <div className="mt-8 flex justify-center gap-16 max-[1104px]:flex-col max-[1104px]:items-center max-[1104px]:mb-16">
          {previewImg.url ? (
            <div className="w-[350px] relative">
              <img
                src={previewImg.url}
                alt=""
                className="rounded-[32px] w-full"
              />
              <div
                onClick={() => setIsEditing(true)}
                className="absolute top-4 right-4 bg-white w-10 h-10 flex items-center justify-center p-1.5 rounded-full cursor-pointer"
              >
                <IKImage src="/general/edit.svg" alt="" />
              </div>
            </div>
          ) : (
            <>
              <label
                htmlFor="file"
                className="bg-[#e9e9e9] cursor-pointer text-[18px] flex items-center justify-center rounded-[32px] border-2 border-dashed border-[#dddddd] w-[320px] h-[440px] p-4 relative max-[380px]:w-full"
              >
                <div className="flex flex-col items-center gap-2">
                  <IKImage src="/general/upload.svg" alt="" />
                  <span className="text-sm">Choose a file</span>
                </div>
                <div className="absolute bottom-6 text-[13px] text-center text-gray-500 w-full">
                  We recommend using high quality .jpg files less than 20 MB or
                  .mp4 files less than 200 MB.
                </div>
              </label>
              <input
                type="file"
                id="file"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
            </>
          )}

          <form
            ref={formRef}
            className="flex flex-col gap-4 w-[420px] max-[540px]:w-full"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-[13px] text-gray-500">
                Title
              </label>
              <input
                type="text"
                placeholder="Add a title"
                name="title"
                id="title"
                className="text-[13px] border-2 border-[#e9e9e9] p-2 rounded-[16px]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="description"
                className="text-[13px] text-gray-500"
              >
                Description
              </label>
              <input
                type="text"
                placeholder="Add a detailed description"
                name="description"
                id="description"
                className="text-[13px] border-2 border-[#e9e9e9] p-4 rounded-[16px]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="link" className="text-[13px] text-gray-500">
                Link
              </label>
              <input
                type="text"
                placeholder="Add a link"
                name="link"
                id="link"
                className="text-[13px] border-2 border-[#e9e9e9] p-2 rounded-[16px]"
              />
            </div>

            {(!isPending || !error) && (
              <div className="flex flex-col gap-2">
                <label htmlFor="board" className="text-[13px] text-gray-500">
                  Board
                </label>
                <select
                  name="board"
                  id="board"
                  className="rounded-2xl border-2 border-gray-200 p-2 text-[15px]"
                >
                  <option value="">Choose a board</option>
                  {data?.map((board) => (
                    <option value={board._id} key={board._id}>
                      {board.title}
                    </option>
                  ))}
                </select>

                <div className="flex items-center justify-end gap-4">
                  {newBoard && (
                    <div className="flex flex-1">
                      <div className="cursor-pointer rounded-xl bg-gray-100 p-2 text-[13px]">
                        {newBoard}
                      </div>
                    </div>
                  )}
                  <div
                    className="w-max cursor-pointer rounded-xl bg-[#3fbccc] py-1 px-2 text-[13px] text-white"
                    onClick={handleNewBoard}
                  >
                    Create new board
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label htmlFor="tags" className="text-[13px] text-gray-500">
                Tagged topics
              </label>
              <input
                type="text"
                placeholder="Add tags"
                name="tags"
                id="tags"
                className="text-[13px] border-2 border-[#e9e9e9] p-2 rounded-[16px]"
              />
              <small className="text-[#a6a6a6] text-[13px]">
                Don&apos;t worry, people won&apos;t see your tags
              </small>
            </div>
          </form>
          {isNewBoardOpen && (
            <BoardForm
              setIsNewBoardOpen={setIsNewBoardOpen}
              setNewBoard={setNewBoard}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CreatePage;
