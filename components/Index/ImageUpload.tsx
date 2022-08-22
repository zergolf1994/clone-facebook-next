import Image from "next/image";
import { useState, useEffect, SetStateAction } from "react";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import uniqid from "uniqid";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "facebook-clone-6c38e.firebaseapp.com",
  projectId: "facebook-clone-6c38e",
  storageBucket: "facebook-clone-6c38e.appspot.com",
  messagingSenderId: "337509918932",
  appId: "1:337509918932:web:4f1b7c8fb17951b73f7341",
};

initializeApp(firebaseConfig);

const storage = getStorage();
const storageRef = ref(storage, uniqid());

const Img = () => {
  const [loading, setLoading] = useState(0);
  const [img, setImg] = useState("");
  const [image, setImage] = useState(null);

  const handleChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (image) {
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setLoading(+progress.toFixed(0));
        },
        error => {
          // Handle unsuccessful uploads
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            setImg(downloadURL);
          });
        }
      );
    }
  };

  return (
    <div className="[grid-area:12/1/19/2] h-full w-full grid gap-2 px-2">
      <div className="relative z-10 flex items-center justify-between w-full px-4 transition-all bg-gray-200 border border-gray-400 border-dashed rounded-lg hover:bg-gray-300">
        <h1 className="absolute text-gray-700 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          Add Photos/Videos
        </h1>
        <input
          type="file"
          onChange={handleChange}
          className="w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      <div className="w-full h-full max-h-4">
        <button onClick={handleSubmit}>Upload</button>
        <div
          className="h-full transition-all bg-[#d1d5db] rounded-full "
          style={{
            width: `${loading}%`,
          }}
        />
      </div>
    </div>
  );
};
export default Img;
