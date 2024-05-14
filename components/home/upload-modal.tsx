/* eslint-disable @next/next/no-img-element */

import Modal from "@/components/shared/modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  ChangeEvent,
} from "react";
import { UploadCloud } from "lucide-react";
import { upload } from "@/app/actions/upload";
import { UploadButton } from "@/components/home/upload-button";
import { useFormState } from "react-dom";

const UploadModal = ({
  showUploadModal,
  setShowUploadModal,
}: {
  showUploadModal: boolean;
  setShowUploadModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [data, setData] = useState<{
    image: string | null;
  }>({
    image: null,
  });

  const [fileSizeTooBig, setFileSizeTooBig] = useState(false);

  const [dragActive, setDragActive] = useState(false);

  const onChangePicture = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFileSizeTooBig(false);
      const file = event.currentTarget.files && event.currentTarget.files[0];
      if (file) {
        if (file.size / 1024 / 1024 > 5) {
          setFileSizeTooBig(true);
        } else {
          const reader = new FileReader();
          reader.onload = (e) => {
            setData((prev) => ({ ...prev, image: e.target?.result as string }));
          };
          reader.readAsDataURL(file);
        }
      }
    },
    [setData],
  );

  // Move to useActionState in future release of Next.js
  const [state, uploadFormAction] = useFormState(upload, {
    message: "",
    status: 0,
  });

  return (
    <Modal showModal={showUploadModal} setShowModal={setShowUploadModal}>
      <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <a href="https://extrapolate.app">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-10 w-10 rounded-full"
            />
          </a>
          <h3 className="font-display text-2xl font-bold">Upload Photo</h3>
          <p className="text-sm text-red-600">{state.message}</p>
        </div>

        <form
          action={uploadFormAction}
          className="grid gap-6 bg-gray-50 px-4 py-8 md:px-16"
        >
          <div>
            <div className="flex items-center justify-between">
              <p className="block text-sm font-medium text-gray-700">Photo</p>
              {fileSizeTooBig && (
                <p className="text-sm text-red-500">
                  File size too big (max 5MB)
                </p>
              )}
            </div>
            <label
              htmlFor="image-upload"
              className="group relative mt-2 flex h-72 cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50"
            >
              <div
                className="absolute z-[5] h-full w-full rounded-md"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(true);
                }}
                onDragEnter={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(false);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(false);
                  setFileSizeTooBig(false);
                  const file = e.dataTransfer.files && e.dataTransfer.files[0];
                  if (file) {
                    if (file.size / 1024 / 1024 > 5) {
                      setFileSizeTooBig(true);
                    } else {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        setData((prev) => ({
                          ...prev,
                          image: e.target?.result as string,
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }
                }}
              />
              <div
                className={`${
                  dragActive ? "border-2 border-black" : ""
                } absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all ${
                  data.image
                    ? "bg-white/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md"
                    : "bg-white opacity-100 hover:bg-gray-50"
                }`}
              >
                <UploadCloud
                  className={`${
                    dragActive ? "scale-110" : "scale-100"
                  } h-7 w-7 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
                />
                <p className="mt-2 text-center text-sm text-gray-500">
                  Drag and drop or click to upload.
                </p>
                <p className="mt-2 text-center text-sm text-gray-500">
                  Recommended: 1:1 square ratio, with a clear view of your face
                </p>
                <span className="sr-only">Photo upload</span>
              </div>
              {data.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.image}
                  alt="Preview"
                  className="h-full w-full rounded-md object-cover"
                />
              )}
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                id="image-upload"
                name="image"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={onChangePicture}
              />
            </div>
          </div>

          <UploadButton data={data} />
        </form>
      </div>
    </Modal>
  );
};

export function useUploadModal() {
  const [showUploadModal, setShowUploadModal] = useState(false);

  const UploadModalCallback = useCallback(() => {
    return (
      <UploadModal
        showUploadModal={showUploadModal}
        setShowUploadModal={setShowUploadModal}
      />
    );
  }, [showUploadModal, setShowUploadModal]);

  return useMemo(
    () => ({ setShowUploadModal, UploadModal: UploadModalCallback }),
    [setShowUploadModal, UploadModalCallback],
  );
}
