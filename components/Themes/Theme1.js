import { useState, useEffect } from "react";
import { useCard } from "@/utils/Theme/cardContext";
import { useJiggle } from "@/utils/Hooks/jiggleModeContext";
import useOnClickOutside from "@/utils/Hooks/useOnClickOutside";
import Cards from "@/components/Cards";
import LinksLoading from "@/components/LinksLoading";
import Device from "@/components/Device";
import Image from "next/image";
import { MdAddAPhoto } from "react-icons/Md";
import { FaTrash } from "react-icons/Fa";
import useDebounce from "@/utils/Hooks/useDebounce";
import Compressor from "compressorjs";
import { storage } from "@/utils/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuth } from "@/utils/auth";
import RemoveImageModal from "@/components/Theme1/RemoveImageModal";

function Theme1() {
  const { jiggleRef, setjiggleMode } = useJiggle();
  const {
    cardMode,
    layouts,
    updateThemeText,
    text,
    updateThemePicture,
    picture,
  } = useCard();
  const { authUser } = useAuth();

  const [showRemoveImageModal, setShowRemoveImageModal] = useState(false);

  // Debounce input for saving text under image
  const [searchTerm, setSearchTerm] = useState(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {});

  useEffect(
    () => {
      if (searchTerm !== null) updateThemeText(debouncedSearchTerm);
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  const handleChangeImage = (e) => {
    console.log("sub");
    const image = e.currentTarget.files[0];

    new Compressor(image, {
      quality: 0.8, // 0.6 can also be used, but its not recommended to go below.
      success: (compressedImage) => {
        const obj = URL.createObjectURL(compressedImage);

        handleUpload(compressedImage);
      },
    });
  };

  const handleUpload = async (compressedImage) => {
    const storageRef = ref(storage, `/${authUser?.uid}/Theme1`);
    // const storageRef = ref(storage, `/${authUser?.uid}/${authUser?.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, compressedImage);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("File available at", url);

          updateThemePicture(url);
        });
      }
    );
  };

  useOnClickOutside(jiggleRef, () => {
    !cardMode && setjiggleMode(false);
  });

  if (!layouts) {
    return <LinksLoading />;
  }

  return (
    <>
      <RemoveImageModal
        showRemoveImageModal={showRemoveImageModal}
        setShowRemoveImageModal={setShowRemoveImageModal}
      />
      <div className="flex justify-between">
        <div className="mx-auto flex-1 space-y-4" style={{ maxWidth: "420px" }}>
          <div className="px-2">
            {picture ? (
              <div className="relative flex items-center justify-center w-24 h-24 mx-auto">
                {/* <MdAddAPhoto className="text-3xl text-white absolute z-20" /> */}
                <label className="cursor-pointer">
                  <input
                    className="hidden"
                    type="file"
                    onChange={(e) => {
                      handleChangeImage(e);
                    }}
                  />
                  <Image
                    className="rounded-full"
                    src={picture}
                    alt="Picture of the author"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                  />
                </label>
                <FaTrash
                  onClick={() => {
                    setShowRemoveImageModal(true);
                  }}
                  className="text-xl text-red-600 absolute z-20 bottom-0 right-0 cursor-pointer"
                />
              </div>
            ) : (
              <label className="cursor-pointer">
                <input
                  className="hidden"
                  type="file"
                  onChange={(e) => {
                    handleChangeImage(e);
                  }}
                />
                <div className="w-24 h-24 mx-auto rounded-full bg-gray-300 relative flex items-center justify-center cursor-pointer">
                  <MdAddAPhoto className="text-4xl text-white" />
                </div>
              </label>
            )}

            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-b-2 border-gray-400 w-full focus:outline-none mt-2 h-8 bg-transparent font-medium text-center"
              placeholder="Enter text"
              defaultValue={text}
              // value={searchTerm || text}
            />
          </div>
          <div ref={jiggleRef} className="">
            <Cards />
          </div>
        </div>
        <Device
          view={
            <DevicePreview
              text={text}
              searchTerm={searchTerm}
              text={text}
              picture={picture}
            />
          }
        />
      </div>
    </>
  );
}

export default Theme1;

const DevicePreview = ({ searchTerm, picture, text }) => {
  return (
    <div className="pt-12 flex flex-col items-center">
      {picture ? (
        <div className="relative flex items-center justify-center">
          <Image
            className="rounded-full"
            src={picture}
            alt="Picture of the author"
            width={96}
            height={96}
            objectFit="cover"
            quality={100}
          />
        </div>
      ) : null}

      <p className="font-medium pt-2">
        {searchTerm !== null ? searchTerm : text}
      </p>
      <Cards preview />
    </div>
  );
};
