const sizeMap = {
  1: "row-span-12",
  2: "row-span-18",
  3: "row-span-16",
  4: "row-span-14",
  5: "row-span-17",
};

const Skeleton = () => {
  return (
    <div
      className="
        grid gap-4 p-5
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        3xl:grid-cols-7
        [grid-auto-rows:10px]
        [grid-auto-flow:dense]
      "
    >
      {Array.from({ length: 21 }).map((_, index) => (
        <div
          key={index}
          className={`
            skeleton-animate
            rounded-lg w-full
            ${sizeMap[(index % 5) + 1]}
          `}
        />
      ))}
    </div>
  );
};

export default Skeleton;
