import React, { Component } from 'react';

const ImagePreview = ({ id, path, ondelete }) => {
   return (
      <div className="p-media__thumb" onClick={() => ondelete(id)}>
         <img src={path} alt="商品画像" />
      </div>
   )
}


export default ImagePreview;