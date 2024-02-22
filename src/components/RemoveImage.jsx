import { useContext } from "react";
import MyContext from "../Context/Mycontext";
import { IoMdRemoveCircle } from "react-icons/io";

function RemoveImage() {
  const { layout, setLayout } = useContext(MyContext);

  //remove image
  function removeImage(index) {
    setLayout((state) => state.filter((_, idx) => idx !== index));
  }

  return (
    <div>
      {layout.length > 0 && (
        <div>
          <p>Remove Image:</p>
          {layout.map((_, index) => (
            <button onClick={() => removeImage(index)} key={index}>
              Image {index + 1}
              <IoMdRemoveCircle size={33} />
            </button>
          ))}
          <hr />
        </div>
      )}
    </div>
  );
}

export default RemoveImage;
