import React, { useRef, useState } from "react";

export default function Picture({
  readablePicture,
  setpicture,
  setReadablePicture,
}) {
  const inputRef = useRef();
  const [error, setError] = useState();
  const handlePicture = (e) => {
    const pic = e.target.files[0];
    if (pic.type.includes("image")) {
      setError("");
      setpicture(pic);

      //reading the picture
      const reader = new FileReader();
      reader.readAsDataURL(pic);
      reader.onload = (e) => {
        setReadablePicture(e.target.result);
      };
    } else if (pic.size > 1024 * 1024 * 5) {
      setError(`${pic.name} is too large, maximum 5mb allowed`);
    } else {
      setError(`${pic.name} format is not allowed`);
    }
  };
  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label htmlFor="picture" className="text-sm font-bold tracking-wide">
        Picture{" "}
      </label>
      {readablePicture ? (
        <div>
          <img
            className="w-20 h-20 object-cover rounded-full"
            src={readablePicture}
            alt="picture"
          />
          {/*change picture*/}
          <div
            onClick={() => {
              setReadablePicture("");
              setpicture("");
            }}
            className="w-20 mt-2 py-1  dark:bg-dark_bg_3 rounded-md text-xs font-bold flex justify-center items-center  cursor-pointer"
          >
            Remove
          </div>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current.click()}
          className="w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex justify-center items-center  cursor-pointer"
        >
          Upload picture
        </div>
      )}

      <input
        accept="image/png,image/jpeg,image/jpg"
        hidden
        ref={inputRef}
        type="file"
        name="picture"
        id="picture"
        onChange={handlePicture}
      />
      {/* error*/}
      <div className="mt-2">
        <p className="text-red-400">{error}</p>
      </div>
    </div>
  );
}
