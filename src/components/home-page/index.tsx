
import React, { useEffect, useState } from 'react'
import Search from '../search'
import { SearchProps } from '../../models/Props'
import { CategoryModel } from '../../models/CategoryModel';
import { categoryService } from '../../services/categoryService';
import CategoryViewVertical from '../category/category-view-v';

const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryModel[]>([]);

  useEffect(() => {
    (async () => {
        var result = await categoryService.getAll();
        if (result.status === 200) {
            setCategories(result.data)
        }
    })()

}, [])

 const onSearch = (search:SearchProps)=>{
    console.log(search)
 }

 const categorySelect = (id:number) =>{
  console.log(id)
 }
  
  return (
    <div className='mt-5'>
      <Search onSearch={onSearch}/>
      <div className='white-container my-5'>
         <span className='mx-auto py-4 fw-bold fs-2'>Розділи на сервісі OLX</span>
         <div className='d-flex flex-wrap gap-4 w-75 mx-auto'>
            {categories.map(x=><CategoryViewVertical category={x} key={x.id} onClick={categorySelect}/>)}
         </div>
      </div>
      <div className='my-5 text-center'>
      <h3 className='py-4 fw-bold fs-2'>VIP оголошення</h3>
      </div>
    </div>
  )
}

export default HomePage