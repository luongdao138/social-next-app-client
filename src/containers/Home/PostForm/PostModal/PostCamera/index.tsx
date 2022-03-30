import ButtonPrimary from 'components/Button/ButtonPrimary';
import React, { useEffect, useRef, useState } from 'react';
import { MdCameraAlt, MdClose } from 'react-icons/md';
import { dataURLtoFile } from 'utils/convertToFile';
import { v4 as uuidv4 } from 'uuid';
import { usePostFormContext } from '../../PostFormContext';

interface Props {
  onClose: () => void;
}

const PostCamera: React.FC<Props> = ({ onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trackRef = useRef<MediaStreamTrack>(null);
  const [preview, setPreview] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const { addFile } = usePostFormContext();

  useEffect(() => {
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia?.({ video: true })
        .then((mediaStream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
            videoRef.current.play();
            const tracks = mediaStream.getTracks();
            (trackRef.current as MediaStreamTrack) = tracks[0];
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return () => {
      if (trackRef.current) {
        trackRef.current.stop();
      }
    };
  }, []);

  const handleCapture = async () => {
    if (videoRef.current && canvasRef.current) {
      const videoEl = videoRef.current;
      const canvasEl = canvasRef.current;

      const width = videoEl.clientWidth;
      const height = videoEl.clientHeight;

      canvasEl.width = width;
      canvasEl.height = height;

      const ctx = canvasEl.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoEl, 0, 0, width, height);
        console.log(ctx);
        let URL = canvasEl.toDataURL('image/jpeg');
        const file = await dataURLtoFile(URL, uuidv4());

        setPreview([...preview, URL]);
        setFiles([...files, file]);
      }
    }
  };

  const handleRemove = (index: number) => {
    let newFiles = [...files];
    let newPreview = [...preview];
    newFiles.splice(index, 1);
    newPreview.splice(index, 1);

    setFiles(newFiles);
    setPreview(newPreview);
  };

  const handleAddImage = () => {
    addFile(files);

    onClose();
  };

  return (
    <div>
      <div className='flex items-center flex-col gap-2'>
        <video autoPlay muted ref={videoRef}></video>
        <MdCameraAlt className='text-4xl text-teal-400 cursor-pointer' onClick={handleCapture} />
        <ButtonPrimary
          fullWidth
          size='sm'
          className='bg-blue-500 text-lg font-semibold hover:bg-blue-600 rounded-lg disabled:bg-blue-300'
          clickHandler={handleAddImage}
          disabled={!preview.length}
        >
          Add
        </ButtonPrimary>
      </div>
      <canvas ref={canvasRef} className='hidden' />
      {preview.length ? (
        <div className='grid grid-cols-3 gap-2 mt-4'>
          {preview.map((image, index) => (
            <div key={index} className='p-1 border relative border-teal-400 rounded'>
              <img src={image} alt='' className='w-full' />
              <span
                onClick={() => handleRemove(index)}
                className='w-6 h-6 flex rounded-full z-10 border border-solid border-neutral-300 bg-white cursor-pointer absolute top-2 right-2'
              >
                <MdClose className='m-auto text-gray-500 text-md' />
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default PostCamera;
