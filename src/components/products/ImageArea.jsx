import { IconButton } from "@material-ui/core"
import React, { useCallback } from 'react'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { makeStyles } from "@material-ui/styles";
import { storage } from "../../firebase";
import ImagePreview from "./ImagePreview";

const useStyles = makeStyles({
   icon: {
      height: 48,
      width: 48,
   }
})

const ImageArea = ({ images, setImages }) => {
   const classes = useStyles()


   const hendleDelete = useCallback(async (id) => {
      if (!window.confirm("削除しますか？")) {
         return;
      }
      const updateImages = images;
      const index = updateImages.findIndex(image => image.id === id);
      updateImages.splice(index, 1);

      setImages([...updateImages]);
      await storage.ref("images").child(id).delete();
   }, [images]);

   const uploadImage = (e) => {
      const files = e.target.files;
      let blob = new Blob(files, { type: "image/jpeg" });
      //ランダム１６桁で取得
      const S = "asakjdhkdsfhedfgdfvdfoALIOKGYFJUVHB12345876";
      const N = 16;
      const fileName = Array.from(crypto.getRandomValues(new Uint16Array(N))).map(n => S[n % S.length]).join("");

      const uploadRef = storage.ref("images").child(fileName)
      const uploadTask = uploadRef.put(blob)
      uploadTask.then(() => {
         uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            const newImage = {
               id: fileName,
               path: downloadURL,
            };
            setImages(prevState => [...prevState, newImage]);
         })
      })
   };
   return (
      <div>
         <div className="p-grid__list-images">
            {images.length !== 0 &&
               images.map(image =>
                  <ImagePreview
                     path={image.path} key={image.id} id={image.id} ondelete={hendleDelete}
                  />
               )
            }
         </div>
         <div className="u-text-right">
            <span>商品画像を登録する</span>
            <IconButton className={classes.icon}>
               <label>
                  <AddPhotoAlternateIcon />
                  <input
                     className="u-display-none"
                     id="image"
                     type="file"
                     onChange={uploadImage}
                  />
               </label>
            </IconButton>
         </div>

      </div>
   )
};

export default ImageArea;