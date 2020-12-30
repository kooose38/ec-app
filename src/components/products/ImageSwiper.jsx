import React, { useState } from 'react';
import Swiper from "react-id-swiper";
import NoImage from "../../assets/img/src/no_image.png"
import "swiper/css/swiper.css"


const ImageSwiper = ({ images }) => {
   const [params] = useState({
      pagination: {
         el: "swiper-pagination",
         typr: "bullets",
         clickable: true,
         dynamicBullets: true
      },
      navigation: {
         nextEl: "swiper-button-next",
         prevEl: "swiper-button-prev",
      },
      loop: true
   })

   const returnImage = (images) => {
      if (Array.isArray(images)) {
         return images[0].path;
      }
   };
   return (
      <Swiper {...params}>
         {images.length === 0 ? (
            <div className="p-media__thumb">
               <img src={NoImage} alt="no image" />
            </div>
         ) : (
               <div className="p-media__thumb">
                  <img src={returnImage(images)} alt="商品画像" />
               </div>

            )}

      </Swiper>
   )
};

export default ImageSwiper;