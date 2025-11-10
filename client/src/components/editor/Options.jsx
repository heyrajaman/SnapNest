import { useState } from "react";
import useEditorStore from "../../utils/editorStore";
import { HexColorPicker } from "react-colorful";

const portraitSizes = [
  { name: "1:2", width: 1, height: 2 },
  { name: "9:16", width: 9, height: 16 },
  { name: "2:3", width: 2, height: 3 },
  { name: "3:4", width: 3, height: 4 },
  { name: "4:5", width: 4, height: 5 },
  { name: "1:1", width: 1, height: 1 },
];

const landscapeSizes = [
  { name: "2:1", width: 2, height: 1 },
  { name: "16:9", width: 16, height: 9 },
  { name: "3:2", width: 3, height: 2 },
  { name: "4:3", width: 4, height: 3 },
  { name: "5:4", width: 5, height: 4 },
  { name: "1:1", width: 1, height: 1 },
];

const Options = ({ previewImg }) => {
  const {
    selectedLayer,
    textOptions,
    setTextOptions,
    canvasOptions,
    setCanvasOptions,
  } = useEditorStore();
  const [isColorPickerOpen, setSetIsColorPickerOpen] = useState(false);

  const originalOrientation =
    previewImg.width < previewImg.height ? "portrait" : "landscape";

  const handleOrientationClick = (orientation) => {
    let newHeight;
    if (originalOrientation === orientation) {
      newHeight = (240 * previewImg.height) / previewImg.width;
    } else {
      newHeight = (240 * previewImg.width) / previewImg.height;
    }
    setCanvasOptions({
      ...canvasOptions,
      orientation,
      size: "original",
      height: newHeight,
    });
  };

  const handleSizeClick = (size) => {
    let newHeight;
    if (size === "original") {
      if (originalOrientation === canvasOptions.orientation) {
        newHeight = (240 * previewImg.height) / previewImg.width;
      } else {
        newHeight = (240 * previewImg.width) / previewImg.height;
      }
    } else {
      newHeight = (240 * size.height) / size.width;
    }
    setCanvasOptions({
      ...canvasOptions,
      size: size === "original" ? "original" : size.name,
      height: newHeight,
    });
  };

  return (
    <div className="flex-1 mt-4">
      {selectedLayer === "text" ? (
        <div className="">
          <div className="flex flex-col gap-2 mb-4">
            <span className="font-medium">Font Size</span>
            <input
              type="number"
              value={textOptions.fontSize}
              onChange={(e) =>
                setTextOptions({ ...textOptions, fontSize: e.target.value })
              }
              className="border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <span className="font-medium">Color</span>
            <div className="relative">
              <div
                className="w-6 h-6 rounded-full cursor-pointer"
                style={{ backgroundColor: textOptions.color }}
                onClick={() => setSetIsColorPickerOpen((prev) => !prev)}
              />
              {isColorPickerOpen && (
                <div className="absolute top-[120%] left-0 z-10">
                  <HexColorPicker
                    color={textOptions.color}
                    onChange={(color) =>
                      setTextOptions({ ...textOptions, color })
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="">
          <div className="flex flex-col gap-2 mb-4">
            <span className="font-medium">Orientation</span>
            <div className="p-1 rounded-lg bg-gray-200 flex text-sm font-medium w-max">
              <div
                className={`p-2 rounded-lg min-w-[36px] flex items-center justify-center cursor-pointer ${
                  canvasOptions.orientation === "portrait" ? "bg-white" : ""
                }`}
                onClick={() => handleOrientationClick("portrait")}
              >
                P
              </div>
              <div
                className={`p-2 rounded-lg min-w-[36px] flex items-center justify-center cursor-pointer ${
                  canvasOptions.orientation === "landscape" ? "bg-white" : ""
                }`}
                onClick={() => handleOrientationClick("landscape")}
              >
                L
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <span className="font-medium">Size</span>
            <div className="p-1 rounded-lg bg-gray-200 flex text-sm font-medium w-max flex-wrap">
              <div
                className={`p-2 rounded-lg min-w-[36px] flex items-center justify-center cursor-pointer ${
                  canvasOptions.size === "original" ? "bg-white" : ""
                }`}
                onClick={() => handleSizeClick("original")}
              >
                Original
              </div>
              {canvasOptions.orientation === "portrait" ? (
                <>
                  {portraitSizes.map((size) => (
                    <div
                      className={`p-2 rounded-lg min-w-[36px] flex items-center justify-center cursor-pointer ${
                        canvasOptions.size === size.name ? "bg-white" : ""
                      }`}
                      key={size.name}
                      onClick={() => handleSizeClick(size)}
                    >
                      {size.name}
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {landscapeSizes.map((size) => (
                    <div
                      className={`p-2 rounded-lg min-w-[36px] flex items-center justify-center cursor-pointer ${
                        canvasOptions.size === size.name ? "bg-white" : ""
                      }`}
                      key={size.name}
                      onClick={() => handleSizeClick(size)}
                    >
                      {size.name}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <span className="font-medium">Background Color</span>
            <div className="relative">
              <div
                className="w-8 h-8 rounded-full cursor-pointer"
                style={{ backgroundColor: canvasOptions.backgroundColor }}
                onClick={() => setSetIsColorPickerOpen((prev) => !prev)}
              />
              {isColorPickerOpen && (
                <div className="absolute top-[120%] left-0 z-10">
                  <HexColorPicker
                    color={canvasOptions.backgroundColor}
                    onChange={(color) =>
                      setCanvasOptions({
                        ...canvasOptions,
                        backgroundColor: color,
                      })
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Options;
