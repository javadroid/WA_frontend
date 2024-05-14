import React, { useRef, useState } from "react";

export default function Picture({ readablePicture }) {
  const inputRef = useRef();
  const [error,setError]=useState()
  const handlePicture=(e)=>{
const pic=e.target.files[0]
if(pic.type.includes("image")){

}else{
    setError(`${pic.name} format is not allowed`)
}
  }
  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label htmlFor="picture" className="text-sm font-bold tracking-wide">
        Picture{" "}
      </label>
      {readablePicture ? (
        <div>
          <img src={readablePicture} alt="picture" />
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
    </div>
  );
}
