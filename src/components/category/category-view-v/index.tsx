import { Avatar } from 'antd'
import React from 'react'
import { CategoryViewProps } from '../../../models/Props'
const imagesUrl = (process.env.REACT_APP_SERVER_HOST || '') + process.env.REACT_APP_IMAGES_FOLDER;

const CategoryViewVertical: React.FC<CategoryViewProps> = ({category,onClick})=> {
  return (
    <div onClick={onClick?()=>onClick(category.id):()=>{}}
     className='vertical-category' style={{width:120}}>
      {category.image && <Avatar className=' flex-shrink-0' size={100} src={imagesUrl + "/200_" + category.image} />}
      <h6 className='my-auto fs-5 text-wrap text-center'>{category.name}</h6>
    </div>
  )
}

export default CategoryViewVertical