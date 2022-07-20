import { useState } from "react";

function PhotosShow(props) {
  const initialParams = {
    id: props.photo.id,
    name: props.photo.name,
    url: props.photo.url,
    width: props.photo.width,
    height: props.photo.height,
  };
  const [params, setParams] = useState(initialParams);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setParams({ ...params, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onUpdatePhoto(params, () => {
      setParams(initialParams);
    });
  };

  return (
    <div>
      <h1>Photo information</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input value={params.name} onChange={handleChange} name="name" type="text" />
        </div>
        <div>
          Url: <input value={params.url} onChange={handleChange} name="url" type="text" />
        </div>
        <div>
          Width: <input value={params.width} onChange={handleChange} name="width" type="text" />
        </div>
        <div>
          Height: <input value={params.height} onChange={handleChange} name="height" type="text" />
        </div>
        <button type="submit">Update photo</button>
      </form>
    </div>
  );
}

export default PhotosShow;
