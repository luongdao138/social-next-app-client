import React, { useContext, useRef, useState } from 'react';

interface ContextState {
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  postTextRef: React.RefObject<HTMLTextAreaElement>;
}

const PostFormContext = React.createContext<ContextState>({} as ContextState);

const PostContextProvider: React.FC = ({ children }) => {
  const [status, setStatus] = useState<string>('');
  const postTextRef = useRef<HTMLTextAreaElement>(null);

  return (
    <PostFormContext.Provider value={{ status, setStatus, postTextRef }}>
      {children}
    </PostFormContext.Provider>
  );
};

export default PostContextProvider;
export const usePostFormContext = () => useContext(PostFormContext);
