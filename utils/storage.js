import { storage } from "@/utils/firebase";
import { getDownloadURL, ref, deleteObject } from "firebase/storage";

export const getFile = async (givenRef) => {
  const url = await getDownloadURL(givenRef);
  console.log(url);
  return url;
};

// Delete the file
export const deleteFile = async (path) => {
  const fileRef = ref(storage, path);
  const testing = await deleteObject(fileRef);
  return testing;
};
