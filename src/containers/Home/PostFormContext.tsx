import _ from 'lodash';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { UserAuth } from 'services/auth.service';
import { FileItem } from 'services/timeline.service';
import { getUserAuth } from 'store/auth/selectors';
import { useAppSelector } from 'store/hooks';

export enum TABS {
  MAIN = 'MAIN',
  CAMERA = 'CAMERA',
  EDIT_PHOTOS = 'EDIT_PHOTOS',
  EDIT_PHOTO = 'EDIT_PHOTO',
}

export const fileTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/avif'];

interface ContextState {
  status?: string;
  updateStatus: (status: string) => void;
  postTextRef: React.RefObject<HTMLTextAreaElement>;
  images?: FileItem[];
  addFile: (file: FileItem[]) => void;
  removeFile: (id: string) => void;
  resetFiles: () => void;
  tab: TABS;
  changeTab: (tab: TABS) => void;
  updateImages: (images: FileItem[]) => void;
  selectedPhoto: FileItem | undefined;
  handleSelectPhoto: (imageId: string) => void;
  updateFile: (id: string, data: Partial<FileItem>) => void;
  handleNextPhoto: () => void;
  handlePrevPhoto: () => void;
  userAuth: UserAuth | undefined;
  resetPostForm: () => void;
}

const PostFormContext = React.createContext<ContextState>({} as ContextState);

const PostContextProvider: React.FC = ({ children }) => {
  const postTextRef = useRef<HTMLTextAreaElement>(null);
  const userAuth = useAppSelector(getUserAuth);
  const [tab, setTab] = useState<TABS>(TABS.MAIN);
  const [status, setStatus] = useState<string>('');
  const [images, setImages] = useState<FileItem[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<FileItem | undefined>(
    undefined
  );

  const addFile = (file: FileItem | FileItem[]) => {
    const originalImages =
      images?.map((i) => _.pick(i, ['id', 'file', 'description'])) || [];
    let newImages: FileItem[] = _.concat(originalImages, file);
    setImages(newImages);
  };

  const removeFile = (id: string) => {
    if (!images) return;

    const newImages = images.filter((f) => f.id !== id);
    setImages(newImages);
  };

  const updateFile = (id: string, data: Partial<FileItem>) => {
    let newImages = _.clone(images);
    newImages = newImages.map((image) =>
      image.id === id ? { ...image, ...data } : image
    );
    setImages(newImages);
  };

  const resetFiles = () => {
    setImages([]);
  };

  const changeTab = useCallback((newTab: TABS) => {
    setTab(newTab);
  }, []);

  const handleSelectPhoto = (imageId: string) => {
    const image = images.find((i) => i.id === imageId);
    setSelectedPhoto(image);
    changeTab(TABS.EDIT_PHOTO);
  };

  const handleNextPhoto = () => {
    const currentIndex = images.findIndex(
      (image) => image.id === selectedPhoto?.id
    );
    if (currentIndex !== -1) {
      if (currentIndex === images.length - 1) {
        // last image
        setSelectedPhoto(images[0]);
      } else {
        setSelectedPhoto(images[currentIndex + 1]);
      }
    }
  };

  const handlePrevPhoto = () => {
    const currentIndex = images.findIndex(
      (image) => image.id === selectedPhoto?.id
    );
    if (currentIndex !== -1) {
      if (currentIndex === 0) {
        // last image
        setSelectedPhoto(images[images.length - 1]);
      } else {
        setSelectedPhoto(images[currentIndex - 1]);
      }
    }
  };

  const resetPostForm = useCallback(() => {
    setStatus('');
    setImages([]);
    setTab(TABS.MAIN);
    setSelectedPhoto(undefined);
  }, []);

  useEffect(() => {
    return () => {
      console.log('Component unmount!');
    };
  }, []);

  return (
    <PostFormContext.Provider
      value={{
        addFile,
        changeTab,
        images,
        postTextRef,
        removeFile,
        resetFiles,
        updateFile,
        status,
        tab,
        updateStatus: setStatus,
        updateImages: setImages,
        handleSelectPhoto,
        selectedPhoto,
        handleNextPhoto,
        handlePrevPhoto,
        userAuth,
        resetPostForm,
      }}
    >
      {children}
    </PostFormContext.Provider>
  );
};

export default PostContextProvider;
export const usePostFormContext = () => useContext(PostFormContext);
