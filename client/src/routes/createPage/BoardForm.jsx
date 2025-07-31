import Image from "../../components/image/image";

const BoardForm = ({ setIsNewBoardOpen, setNewBoard }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    setNewBoard(title);
    setIsNewBoardOpen(false);
  };

  return (
    <div className="absolute top-0 left-0 z-[999] flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="relative flex flex-col rounded-2xl bg-white p-6">
        <div
          className="absolute top-4 right-4 cursor-pointer"
          onClick={() => setIsNewBoardOpen(false)}
        >
          <Image src="/general/cancel.svg" alt="" w={20} h={20} />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
          <h1 className="text-sm font-medium text-gray-400">
            Create a new board
          </h1>
          <input
            type="text"
            placeholder="Board Title"
            className="rounded-2xl border-2 border-gray-200 p-2 text-[15px] outline-none focus:ring-2 focus:ring-[#e50829]/50"
          />
          <button className="cursor-pointer rounded-xl bg-[#e50829] p-2 text-white transition-colors hover:bg-[#c1011e]">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default BoardForm;
