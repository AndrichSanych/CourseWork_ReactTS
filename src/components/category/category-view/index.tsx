import React from 'react'
import { CategoryModel } from '../../../models/CategoryModel'
import { Avatar } from 'antd';
const imagesUrl = process.env.REACT_APP_SERVER_HOS || '' +  process.env.REACT_APP_IMAGES_FOLDER;

const CategoryView:React.FC<CategoryModel> = (category:CategoryModel) => {
  return (
    <div className='d-flex gap-4'>
        { category.image && <Avatar size={64} src={imagesUrl + "/200_" + category.image}/>}
        <h6 className='my-auto'>{category.name}</h6>
    </div>
  )
}

export default CategoryView