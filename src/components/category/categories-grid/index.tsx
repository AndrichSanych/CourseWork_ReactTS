import React from 'react'
import { CategoryModel } from '../../../models/CategoryModel'
import CategoryView from '../category-view'
import { Col, Row } from 'antd'

interface CategoryGridProps{
  categories: CategoryModel[]
  handleClick?:Function
}

const CategoriesGrid: React.FC<CategoryGridProps> = ({categories,handleClick}) => {
  return (
    <Row className='p-3' gutter={[16, 16]}>
          {categories && categories.map((x, index) =>
            <Col
              sm={{ span: 16 }}
              md={{ span: 10 }}
              lg={{ span: 8 }}
              xl={{ span: 6 }}
              key={index}>
              <div className='category-view rounded-3'>
                <CategoryView category={x} onClick={handleClick?handleClick:()=>{}} />
              </div>

            </Col>
          )}
        </Row>
  )
}

export default CategoriesGrid