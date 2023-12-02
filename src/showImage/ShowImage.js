import './showImage.css';
import { useLocation } from "react-router-dom";
function ShowImage() {
    let location = useLocation();

    return(
        <div id = 'image'>
            <img src = {`data:image/jpeg;base64,${location.state}`} height={700} width={700}  alt = 'product'/>
        </div>
    )
}

export default ShowImage;