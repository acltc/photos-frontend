function PhotosIndex(props) {
  return (
    <div>
      <h1>All photos</h1>
      {props.photos.map((photo) => (
        <div key={photo.id}>
          <h2>{photo.name}</h2>
          <img src={photo.url} />
          <p>Width: {photo.width}</p>
          <p>Height: {photo.height}</p>
          <button onClick={props.onShowPhoto.bind(this, photo)}>Show more</button>
        </div>
      ))}
    </div>
  );
}

export default PhotosIndex;
