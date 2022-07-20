import { useState, useEffect } from "react";
import axios from "axios";

import PhotosIndex from "./PhotosIndex";
import PhotosNew from "./PhotosNew";
import PhotosShow from "./PhotosShow";
import Modal from "./Modal";

function Home() {
  const [photos, setPhotos] = useState([]);
  useEffect(function () {
    axios.get("http://localhost:3000/photos.json").then((response) => {
      console.log("photos index", response.data);
      setPhotos(response.data);
    });
  }, []);

  const [currentPhoto, setCurrentPhoto] = useState({});

  const handleCreatePhoto = (params, successCallback) => {
    console.log("handleCreatePhoto", params);
    axios.post("http://localhost:3000/photos.json", params).then((response) => {
      setPhotos([...photos, response.data]);
      successCallback();
    });
  };

  const handleShowPhoto = (photo) => {
    setCurrentPhoto(photo);
  };

  const handleHidePhoto = () => {
    setCurrentPhoto({});
  };

  return (
    <div>
      <PhotosNew onCreatePhoto={handleCreatePhoto} />
      <PhotosIndex photos={photos} onShowPhoto={handleShowPhoto} />
      <Modal show={currentPhoto.id} onCloseModal={handleHidePhoto}>
        <PhotosShow photo={currentPhoto} />
      </Modal>
    </div>
  );
}

export default Home;
