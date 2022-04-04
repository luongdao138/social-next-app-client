import LSModal from 'components/Modal';
import { BaseEmoji } from 'emoji-mart';
import React, { useCallback, useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { TABS, usePostFormContext } from '../../PostFormContext';
import EditPhoto from './Containers/EditPhoto';
import EditPhotoDetail from './Containers/EditPhotoDetail';
import Main from './Containers/Main';
import PostCamera from './PostCamera';
interface Props {
  open: boolean;
  onClose: () => void;
}

const PostModal: React.FC<Props> = ({ open, onClose }) => {
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);
  const [openImage, setOpenImage] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const {
    changeTab,
    tab,
    postTextRef,
    updateStatus,
    status = '',
    images = [],
  } = usePostFormContext();

  const canRenderHeader = tab !== TABS.EDIT_PHOTO;

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleOpenEmoji = useCallback(() => {
    if (!openEmoji) {
      setOpenEmoji(true);
    }
  }, [openEmoji]);

  const handleCloseEmoji = useCallback(() => {
    if (openEmoji) {
      setOpenEmoji(false);
    }
  }, [openEmoji]);

  const handleOpenImage = useCallback(() => {
    setOpenImage(true);
  }, []);

  const handleCloseImage = useCallback(() => {
    setOpenImage(false);
  }, []);

  const handleOpenCamera = useCallback(() => {
    changeTab(TABS.CAMERA);
  }, [changeTab]);

  const handleBackToMain = useCallback(() => {
    changeTab(TABS.MAIN);
  }, [changeTab]);

  const handleSelect = (e: BaseEmoji) => {
    const inputEl = postTextRef.current;
    if (inputEl) {
      inputEl.focus();
      const start = status.substring(0, inputEl.selectionStart);
      const end = status.substring(inputEl.selectionStart);
      const text = start + e.native + end;
      updateStatus(text);
      setCursorPosition(start.length + e.native.length);
    }
  };

  useEffect(() => {
    if (postTextRef.current) {
      postTextRef.current.selectionEnd = cursorPosition;
    }
  }, [cursorPosition, postTextRef]);

  useEffect(() => {
    if (images.length) {
      handleOpenImage();
    }
  }, [images, handleOpenImage]);

  const renderHeader = () => {
    switch (tab) {
      case TABS.CAMERA:
        return (
          <div className='flex items-center justify-between'>
            <span
              className='w-7 h-7 flex rounded-full bg-gray-200 cursor-pointer'
              onClick={handleBackToMain}
            >
              <MdClose className='m-auto text-gray-500 text-lg' />
            </span>
            <h1 className='font-bold text-xl'>Take photo</h1>
            <span></span>
          </div>
        );
      case TABS.MAIN:
        return (
          <div className='flex items-center justify-between'>
            <span></span>
            <h1 className='font-bold text-xl'>Create Post</h1>
            <span
              className='w-7 h-7 flex rounded-full bg-gray-200 cursor-pointer'
              onClick={handleClose}
            >
              <MdClose className='m-auto text-gray-500 text-lg' />
            </span>
          </div>
        );
      case TABS.EDIT_PHOTOS:
        return (
          <div className='flex items-center justify-between'>
            <span
              className='w-7 h-7 flex rounded-full bg-gray-200 cursor-pointer'
              onClick={handleBackToMain}
            >
              <MdClose className='m-auto text-gray-500 text-lg' />
            </span>
            <h1 className='font-bold text-xl'>Edit Photo</h1>
            <span></span>
          </div>
        );

      default:
        return <></>;
    }
  };

  const renderContent = () => {
    switch (tab) {
      case TABS.MAIN:
        return (
          <Main
            open={open}
            handleCloseEmoji={handleCloseEmoji}
            handleCloseImage={handleCloseImage}
            handleOpenCamera={handleOpenCamera}
            handleOpenEmoji={handleOpenEmoji}
            handleOpenImage={handleOpenImage}
            handleSelect={handleSelect}
            openEmoji={openEmoji}
            openImage={openImage}
          />
        );
      case TABS.CAMERA:
        return <PostCamera onClose={handleBackToMain} />;
      case TABS.EDIT_PHOTOS:
        return <EditPhoto handleBack={handleBackToMain} />;
      case TABS.EDIT_PHOTO:
        return <EditPhotoDetail />;

      default:
        return <></>;
    }
  };

  const getWidth = () => {
    switch (tab) {
      case TABS.MAIN:
        return 'xl';
      case TABS.CAMERA:
        return 'xl';
      case TABS.EDIT_PHOTOS:
        return '4xl';
      case TABS.EDIT_PHOTO:
        return '6xl';

      default:
        return 'xl';
    }
  };

  return (
    <LSModal
      overflow={tab === TABS.MAIN}
      open={open}
      maxWidth={getWidth()}
      fullWidth
      onBackdropClose
      onClose={handleClose}
    >
      {/* Header */}
      {canRenderHeader ? (
        <>
          {renderHeader()}
          <div
            className='w-full bg-gray-200 mt-4 mb-4'
            style={{ height: 1 }}
          ></div>
        </>
      ) : null}

      {/* {renderContent()} */}
      {renderContent()}
    </LSModal>
  );
};

export default PostModal;
