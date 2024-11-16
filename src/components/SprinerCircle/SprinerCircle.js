import { useState} from "react";
import GridLoader from "react-spinners/GridLoader";

const override = {
    display: "block",
    margin: "auto",
    borderColor: "red",
    zIndex:40,
    position: "fixed",
    top: "50%",        // Đặt ở giữa chiều dọc
    left: "50%",       // Đặt ở giữa chiều ngang
    transform: "translate(-50%, -50%)"
};
function SprinerCircle() {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#fe2c55");
    
    return (
      <div className="sweet-loading">
        <GridLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
  
  export default SprinerCircle;