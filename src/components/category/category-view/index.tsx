import React from 'react'
import { CategoryModel } from '../../../models/CategoryModel'
import { Avatar } from 'antd';

const imagesUrl = (process.env.REACT_APP_SERVER_HOST || '') + process.env.REACT_APP_IMAGES_FOLDER;

interface CategoryViewProps{
  category: CategoryModel
  onClick?:Function
}

const CategoryView: React.FC<CategoryViewProps> = ({category,onClick}) => {
  return (
    <div onClick={onClick?()=>onClick(category.id):()=>{}}
     className='d-flex  gap-3 p-2 rounded-3' >
      {category.image && <Avatar className=' flex-shrink-0' size={90} src={imagesUrl + "/200_" + category.image} />}
      <h6 className='my-auto fs-5 text-wrap '>{category.name}</h6>
    </div>
  )
}

export default CategoryView