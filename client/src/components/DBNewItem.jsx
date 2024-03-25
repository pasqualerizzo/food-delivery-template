import React, { useState } from 'react';
import { statuses } from '../utils/styles';
import { Spinner } from '../components';
import {FaCloudUploadAlt, MdDelete} from "../assets/icons";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from "../config/firebase.config";
import { useDispatch, useSelector } from 'react-redux';
import { alertNull, alertDanger, alertSuccess } from '../context/actions/alertAction';
import { buttonClick } from '../animations';
import { motion } from 'framer-motion';
import ProgressBar from './ProgressBar';



const DBNewItem = () => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const [imageDownloadURL, setImageDownloadURL] = useState(null);

  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storage = getStorage();
    const storageRef = ref(storage, `Images/${Date.now()}_${imageFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on('state_changed', 
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      }, 
      (error) => {
        dispatch(alertDanger(`Errore : ${error}`));
        setTimeout(() => {
          dispatch(alertNull());
        }, 3000);
      }, 
      () => {

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageDownloadURL(downloadURL)
          setIsLoading(false)
          setProgress(null)
          dispatch(alertSuccess("Immagine Caricata Con Successo"));
            setTimeout(() => {
              dispatch(alertNull());
            }, 3000);
        });
      }
    );  
  };


  const deleteImageFromFirebase = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageDownloadURL)

    deleteObject(deleteRef).then(() => {
      setImageDownloadURL(null)
      setIsLoading(false)
      dispatch(alertSuccess("Immagine Eliminata Con Successo"));
        setTimeout(() => {
          dispatch(alertNull());
        }, 3000);
    })
  };
 
  return (
    <div className='flex items-center justify-center flex-col pt-6 px-24 w-full'>
      <div className='border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-10'>
        <InputValueField 
          type="text"
          placeHolder={"Nome Del Prodotto"}
          stateFunc={setItemName}
          stateValue={itemName}
        />

        <div className='w-full flex items-center justify-around gap-3 flex-wrap'>
          {statuses &&
            statuses?.map((data) => (
            <p 
            key={data.id}
            onClick={() => setCategory(data.category)} 
            className={`px-4 py-3 rounded-md text-xl text-textColor font-semibold cursor-pointer hover:shadow-md border border-gray-200 backdrop-blur-md ${
              data.category === category 
              ? " text-white bg-red-400" 
              : "bg-transparent" 
            }`}
            >
              {data.title}
            </p>
          ))}
        </div>

        <InputValueField 
          type="number"
          placeHolder={"Prezzo Del Prodotto"}
          stateFunc={setPrice}
          stateValue={price}
        />

        <div className='w-full bg-card backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer'>
            {isLoading ? (
              <div className='w-full h-full flex flex-col items-center justify-evenly px-24'>
                <Spinner />
                <ProgressBar/>
              </div>
              ) : ( 
              <>
                {!imageDownloadURL ? (
                  <>
                    <label>
                      <div className='flex flex-col items-center justify-center h-full w-full cursor-pointer'>
                        <div className='flex flex-col justify-center items-center cursor-pointer'>
                          <p className='font-bold text-4xl'>
                            <FaCloudUploadAlt className='-rotate-0' />
                          </p>
                          <p className='text-lg text-textColor'>
                            Clicca per Caricare un Immagine
                          </p>

                        </div>
                      </div>
                      <input 
                        type="file"
                        name="upload-image"
                        accept="image/*"
                        onChange={uploadImage}
                        className= 'w-0 h-0'
                        />
                    </label>
                  </>
                  ) : (
                    <>
                      <div className='relative w-full h-full overflow-hidden rounded-md'>
                        <motion.img 
                          whileHover={{ scale : 1.15 }}
                          src={imageDownloadURL}
                          className="w-full h-full object-cover"
                        />

                        <motion.button 
                          {...buttonClick}
                          type="button"
                          className="absolute top-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                          onClick={() => deleteImageFromFirebase
                          (imageDownloadURL)}
                        >
                          <MdDelete className='-rotate-0' />
                        </motion.button>

                      </div>
                    </>
                  )}
              </>
              )}
        </div>
      </div>     
    </div>
  )
}

export const InputValueField = ({
  type, 
  placeHolder, 
  stateValue, 
  stateFunc,
}) => {
  return (
      <>
        <input 
        type={type}
        placeholder={placeHolder}
        className= 'w-full px-4 py-3 bg-lightOverlay shadow-md outline-none rounded-md border border-gray-200 focus:border-red-400'
        value={stateValue}
        onChange={(e) => stateFunc(e.target.value)} 
        />
      </>
  );
};

export default DBNewItem