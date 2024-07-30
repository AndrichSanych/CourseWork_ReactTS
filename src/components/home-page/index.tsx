
import React, { useEffect, useState } from 'react'
import Search from '../search'
import { SearchProps } from '../../models/Props'
import { CategoryModel } from '../../models/CategoryModel';
import { categoryService } from '../../services/categoryService';
import CategoryViewVertical from '../category/category-view-v';
import { AdvertModel } from '../../models/AdvertModel';
import { advertService } from '../../services/advertService';
import axios from 'axios';
import SmallAdvertView from '../advert/advert-viewer-small';
import { Col, Row } from 'antd';
import { getQueryString } from '../../helpers/common-methods';
import { FilterModel } from '../../models/FilterModel';
import { useSearchParams } from 'react-router-dom';


const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [vipAdverts, setVipAdverts] = useState<AdvertModel[]>([]);
  const [filter, setFilter] = useState<FilterModel>(
    {
      cityId: Number(searchParams.get("cityId")) || undefined,
      areaId: Number(searchParams.get("areaId")) || undefined,
      search: searchParams.get("search") || undefined,
      categoryId: Number(searchParams.get("categoryId")) || undefined,
    }
  )
  useEffect(() => {
    setSearchParams(getQueryString(filter))
  }, [filter])

  useEffect(() => {
    console.log('send request', filter)

  }, [searchParams])

  useEffect(() => {
    if (searchParams.size === 0) {
      (async () => {
        const [categs, vips] = await axios.all(
          [
            categoryService.getAll(),
            advertService.getVip(12)
          ])
        if (categs.status === 200)
          setCategories(categs.data)
        if (vips.status === 200)
          setVipAdverts(vips.data)

      })()
    }
  }, [])

  const onSearch = (search: SearchProps) => {
    setFilter((prevState) => ({
      ...prevState,
      search: search.searchString,
      areaId: search.isArea ? search.placeId : undefined,
      cityId: search.isArea ? undefined : search.placeId
    }))
  }

  const categorySelect = (id: number) => {
    setFilter((prevState) => ({
      ...prevState,
      categoryId: id
    }))
  }

  return (
    <div className='mt-5'>
      <Search onSearch={onSearch} />
      {searchParams.size === 0
        ? <>
          <div className='white-container my-5'>
            <span className='mx-auto py-4 fw-bold fs-2'>Розділи на сервісі OLX</span>
            <Row className='p-3 w-75 mx-auto'>
              {categories && categories.map((x, index) =>
                <Col
                  sm={{ span: 12 }}
                  md={{ span: 8 }}
                  lg={{ span: 6 }}
                  xl={{ span: 4 }}
                  xxl={{ span: 3 }}
                  key={index}>
                  <CategoryViewVertical category={x} key={x.id} onClick={categorySelect} />
                </Col>
              )}
            </Row>
          </div>
          <div className='my-5 text-center'>
            <h3 className='py-4 fw-bold fs-2'>VIP оголошення</h3>
            <Row className='p-3 w-75 mx-auto' gutter={[10, 10]}>
              {vipAdverts && vipAdverts.map((x, index) =>
                <Col
                  sm={{ span: 24 }}
                  md={{ span: 12 }}
                  lg={{ span: 8 }}
                  xl={{ span: 6 }}
                  key={index}>
                  <SmallAdvertView key={x.id} advert={x} />
                </Col>
              )}
            </Row>
          </div>
        </>
        : <>
          Filter
        </>}

    </div>
  )
}

export default HomePage