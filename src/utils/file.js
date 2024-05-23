import axios from "axios";

export const getFileType = (memType) => {
  switch (memType) {
    case "text/plain":
      return "TXT";
    case "application/pdf":
    case "application/x-zip-compressed":
      return "PDF";
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return "DOCX";
    case "application/vnd.ms-powerpoint":
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      return "PPTX";
    case "application/vnd.ms-excel":
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      return "XLSX ";
    case "application/vnd.rar":
      return "RAR";
    case "application/zip":
      return "ZIP";
    case "audio/mpeg":
    case "audio/wav":
      return "AUDIO";
    case "video/mp4":
    case "video/mpeg":
      return "VIDEO";
    default:
      return "IMAGE";
  }
};

export const uploadFiles = async (files) => {
  
  let formData = new FormData();
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_SECRET);
    
    let uploaded=[]
for (const f of files){
  const {file,type}=f
  formData.append("file", file);
  let res=await uploadToClouinary(formData,type)
  uploaded.push({file:res,type})

}
return uploaded
};
const uploadToClouinary=(formData,type)=>{
return new Promise(async(resolve)=>{
  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_NAME
    }/raw/upload`,
    formData
  );

  return resolve(data)
})
}
