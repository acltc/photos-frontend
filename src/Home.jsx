import { useState, useEffect } from "react";
import axios from "axios";

import PhotosIndex from "./PhotosIndex";

function Home() {
  const [photos, setPhotos] = useState([]);
  useEffect(function () {
    axios.get("http://localhost:3000/photos.json").then((response) => {
      console.log("photos index", response.data);
      setPhotos(response.data);
    });
  }, []);

  return (
    <div>
      <PhotosIndex photos={photos} />
    </div>
  );
}

export default Home;
