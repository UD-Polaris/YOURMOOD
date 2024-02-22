import { useEffect, useState } from "react";
import MyContext from "./Context/Mycontext";
import { MdAddToQueue, MdMenu, MdClose } from "react-icons/md";

import img1 from "./assets/001.png";
import img2 from "./assets/002.png";
import img3 from "./assets/003.png";
import img4 from "./assets/004.png";
import img5 from "./assets/005.png";
import img6 from "./assets/006.png";
import img7 from "./assets/007.png";
import img8 from "./assets/008.png";
import RemoveImage from "./components/RemoveImage";
import ThemeChanger from "./components/ThemeChanger";

function App() {
  const [layout, setLayout] = useState([]);
  const [bgColor, setBgColor] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  function localSaving() {
    localStorage.setItem("Layout", JSON.stringify(layout));
    localStorage.setItem("ChangedBgColor", bgColor);
    console.log(localStorage);
  }

  function addImageLayout() {
    setLayout([img1, img2, img3, img4, img5, img6, img7, img8]);
  }

  function handleDragStart(e, index) {
    e.dataTransfer.setData("index", index.toString());
  }

  function handleDrop(e, newIndex) {
    const oldIndex = parseInt(e.dataTransfer.getData("index"));
    const newLayout = [...layout];
    const [draggedElement] = newLayout.splice(oldIndex, 1);
    console.log(draggedElement);
    newLayout.splice(newIndex, 0, draggedElement);
    setLayout(newLayout);
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    const savedLayout = JSON.parse(localStorage.getItem("Layout"));
    const savedBgColor = localStorage.getItem("ChangedBgColor");
    if (savedLayout && savedBgColor) {
      setLayout(savedLayout);
      setBgColor(savedBgColor);
    }
  }, []);

  return (
    <MyContext.Provider value={{ layout, setLayout }}>
      <div>
        {!showSidebar && <MdMenu onClick={() => toggleSidebar()} size={33} />}

        {showSidebar && <MdClose onClick={toggleSidebar} size={33} />}

        <div>
          <h1>IMAGE DASHBOARD</h1>
          {layout.length === 0 ? (
            <div>
              <p>Add Layout with Images:</p>
              <button onClick={addImageLayout}>
                Add Layout
                <MdAddToQueue size={33} />
              </button>
            </div>
          ) : (
            ""
          )}

          <hr />
          <RemoveImage />

          <ThemeChanger setBgColor={setBgColor} />
          <hr />
          {layout.length > 0 && (
            <div>
              <p>Save To LocalStorage:</p>
              <button onClick={localSaving}>Save</button>
            </div>
          )}
        </div>

        <div>
          {layout.length > 0 ? (
            layout.map((item, index) => (
              <img
                key={index}
                src={item}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, index)}
              />
            ))
          ) : (
            <p>Click To add layout.</p>
          )}
        </div>
      </div>
    </MyContext.Provider>
  );
}

export default App;
