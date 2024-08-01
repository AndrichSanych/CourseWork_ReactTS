
import React, { useEffect, useState } from 'react'
import Search from '../search'
import { CategoryModel } from '../../models/CategoryModel';
import { categoryService } from '../../services/categoryService';
import { AdvertModel } from '../../models/AdvertModel';
import axios from 'axios';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getQueryString } from '../../helpers/common-methods';

import { FilterModel } from '../../models/FilterModel';
import StartContent from './start-content';


const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams('');
  const [adverts, setAdverts] = useState<AdvertModel[]>([]);
  const [filter, setFilter] = useState<FilterModel>(
    {
      cityId: Number(searchParams.get("cityId")) || undefined,
      areaId: Number(searchParams.get("areaId")) || undefined,
      search: searchParams.get("search") || undefined,
      categoryId: Number(searchParams.get("categoryId")) || undefined,
      isNew: Boolean(searchParams.get("isNew")) || undefined,
      isVip: Boolean(searchParams.get("isVip")) || undefined,
      isContractPrice: Boolean(searchParams.get("isContractPrice")) || undefined,
      priceFrom:Number(searchParams.get("priceFrom")) || undefined,
      priceTo:Number(searchParams.get("priceTo")) || undefined,
    }
  )

  useEffect(() => {
    const queryString = getQueryString(filter);
    if(queryString !== '' || location.pathname !== '/')
       setSearchParams(queryString)
  }, [filter])

  useEffect(() => {
    // console.log('send request', filter)

  }, [searchParams])

  useEffect(()=>{
    if(location.pathname==='/'){
      setFilter({ })
    }
  },[location])

  useEffect(() => {
    (async () => {
      const [categs] = await axios.all(
        [
          categoryService.getAll(),
        ])
      if (categs?.status === 200)
        setCategories(categs.data)
    })()
  }, [])

  const onSearch = (searchFilter: FilterModel) => {
    if (location.pathname === '/') {
      navigate(`/main-search`);
    }
    setFilter(searchFilter)
  }

  const categorySelect = (id: number) => {
    if (location.pathname === '/') {
      navigate(`/main-search`);
    }
    setFilter({
      ...filter,
      categoryId: id
    })
  }


  return (
    <div className='mt-5'>
      <Search categories={categories} isFilter={location.pathname !== '/'} filter={filter} onSearch={onSearch} />
      {location.pathname === '/'
        ? <StartContent
          categories={categories}
          onCategorySelect={categorySelect} />
        : <div>table</div>}
    </div>
  )
}

export default HomePage