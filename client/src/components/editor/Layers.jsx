import useEditorStore from "../../utils/editorStore";
import Image from "../image/image";

const Layers = () => {
  const { selectedLayer, setSelectedLayer, addText, canvasOptions } =
    useEditorStore();

  const handleSelectedLayer = (layer) => {
    setSelectedLayer(layer);

    if (layer === "text") {
      addText();
    }
  };
  return (
    <div className="flex-1 flex flex-col gap-2 mt-4">
      <div className="layersTitle">
        <h3 className="text-xl font-medium">Layers</h3>
        <p className="text-sm text-gray-500 mt-1">Select a layer to edit</p>
      </div>

      <div
        onClick={() => handleSelectedLayer("text")}
        className={`flex items-center gap-2 p-2 rounded-2xl cursor-pointer font-light text-sm hover:bg-gray-100 ${
          selectedLayer === "text" ? "bg-gray-100" : ""
        }`}
      >
        <div className="w-8 h-8 rounded-lg overflow-hidden">
          <Image src="/general/text.png" alt="" w={48} h={48} />
        </div>
        <span>Add Text</span>
      </div>

      <div
        onClick={() => handleSelectedLayer("canvas")}
        className={`flex items-center gap-2 p-2 rounded-2xl cursor-pointer font-light text-sm hover:bg-gray-100 ${
          selectedLayer === "canvas" ? "bg-gray-100" : ""
        }`}
      >
        <div
          className="w-8 h-8 rounded-lg"
          style={{ backgroundColor: canvasOptions.backgroundColor }}
        ></div>
        <span>Canvas</span>
      </div>
    </div>
  );
};

export default Layers;
