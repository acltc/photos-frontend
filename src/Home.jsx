import { useState, useEffect } from "react";
import axios from "axios";

import PhotosIndex from "./PhotosIndex";
import PhotosNew from "./PhotosNew";

function Home() {
  const [photos, setPhotos] = useState([]);
  useEffect(function () {
    axios.get("http://localhost:3000/photos.json").then((response) => {
      console.log("photos index", response.data);
      setPhotos(response.data);
    });
  }, []);

  const handleCreatePhoto = (params, successCallback) => {
    console.log("handleCreatePhoto", params);
    axios.post("http://localhost:3000/photos.json", params).then((response) => {
      setPhotos([...photos, response.data]);
      successCallback();
    });
  };

  return (
    <div>
      <PhotosNew onCreatePhoto={handleCreatePhoto} />
      <PhotosIndex photos={photos} />
    </div>
  );
}

export default Home;
