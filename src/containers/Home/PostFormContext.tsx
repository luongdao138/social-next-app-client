import _ from 'lodash';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FileItem } from 'services/postForm.service';

export enum TABS {
  MAIN = 'MAIN',
  CAMERA = 'CAMERA',
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
}

const PostFormContext = React.createContext<ContextState>({} as ContextState);

const PostContextProvider: React.FC = ({ children }) => {
  const postTextRef = useRef<HTMLTextAreaElement>(null);
  const [tab, setTab] = useState<TABS>(TABS.MAIN);
  const [status, setStatus] = useState<string>('');
  const [images, setImages] = useState<FileItem[]>([]);

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

  const resetFiles = () => {
    setImages([]);
  };

  const changeTab = useCallback((newTab: TABS) => {
    setTab(newTab);
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
        status,
        tab,
        updateStatus: setStatus,
        updateImages: setImages,
      }}
    >
      {children}
    </PostFormContext.Provider>
  );
};

export default PostContextProvider;
export const usePostFormContext = () => useContext(PostFormContext);
