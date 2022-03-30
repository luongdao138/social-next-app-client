import React, { useContext, useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { createPreviewUrl, destroyPreviewUrl } from 'utils/convertToFile';
interface FileItem {
  file: File;
  id: string;
}

export enum TABS {
  MAIN = 'MAIN',
  CAMERA = 'CAMERA',
  EDIT_PHOTO = 'EDIT_PHOTO',
}

interface ContextState {
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  postTextRef: React.RefObject<HTMLTextAreaElement>;
  files: FileItem[];
  addFile: (file: File[]) => void;
  removeFile: (id: string) => void;
  previewSrc: string[];
  resetFiles: () => void;
  tab: TABS;
  setTab: React.Dispatch<React.SetStateAction<TABS>>;
}

const PostFormContext = React.createContext<ContextState>({} as ContextState);

const PostContextProvider: React.FC = ({ children }) => {
  const [status, setStatus] = useState<string>('');
  const postTextRef = useRef<HTMLTextAreaElement>(null);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [previewSrc, setPreviewSrc] = useState<string[]>([]);
  const [tab, setTab] = useState<TABS>(TABS.MAIN);

  const addFile = (file: File | File[]) => {
    if (Array.isArray(file)) {
      setFiles(
        _.concat(
          files,
          file.map((f) => ({ file: f, id: uuidv4() }))
        )
      );
    } else {
      setFiles((prev) => [...prev, { file, id: uuidv4() }]);
    }
  };

  const removeFile = (id: string) => {
    const newFiles = files.filter((f) => f.id !== id);
    setFiles(newFiles);
  };

  const resetFiles = () => {
    setFiles([]);
    setPreviewSrc([]);
  };

  useEffect(() => {
    if (files.length) {
      previewSrc.forEach((url) => {
        destroyPreviewUrl(url);
      });
      let urls: string[] = [];
      files.forEach((file) => {
        urls.push(createPreviewUrl(file.file));
      });

      setPreviewSrc(urls);
    }
  }, [files]);

  return (
    <PostFormContext.Provider
      value={{
        status,
        setStatus,
        postTextRef,
        files,
        addFile,
        removeFile,
        previewSrc,
        resetFiles,
        tab,
        setTab,
      }}
    >
      {children}
    </PostFormContext.Provider>
  );
};

export default PostContextProvider;
export const usePostFormContext = () => useContext(PostFormContext);
