import Gallery from "./components/gallery/gallery";
import LeftBar from "./components/leftBar/leftBar";
import TopBar from "./components/topBar/topBar";

const App = () => {
  return (
    <div className="w-full flex gap-4">
      <LeftBar />
      <div className="flex-1 mr-4">
        <TopBar />
        <Gallery />
      </div>
    </div>
  );
};

export default App;
