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

  const handleUpdatePhoto = (params, successCallback) => {
    console.log("handleUpdatePhoto", params);
    axios.patch(`http://localhost:3000/photos/${params.id}.json`, params).then((response) => {
      setPhotos(
        photos.map((photo) => {
          if (photo.id === response.data.id) {
            return response.data;
          } else {
            return photo;
          }
        })
      );
      successCallback();
      handleHidePhoto();
    });
  };

  const handleDestroyPhoto = (photo) => {
    console.log("handleDestroyPhoto", photo);
    axios.delete(`http://localhost:3000/photos/${photo.id}.json`).then((response) => {
      setPhotos(photos.filter((p) => p.id !== photo.id));
      handleHidePhoto();
    });
  };

  return (
    <div>
      <PhotosNew onCreatePhoto={handleCreatePhoto} />
      <PhotosIndex photos={photos} onShowPhoto={handleShowPhoto} />
      <Modal show={currentPhoto.id} onCloseModal={handleHidePhoto}>
        <PhotosShow
          photo={currentPhoto}
          onUpdatePhoto={handleUpdatePhoto}
          onDestroyPhoto={handleDestroyPhoto}
        />
      </Modal>
    </div>
  );
}

export default Home;
