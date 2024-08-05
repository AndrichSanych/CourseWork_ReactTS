
import React, { useEffect, useState } from 'react'
import { CategoryModel } from '../../models/CategoryModel';
import { categoryService } from '../../services/categoryService';
import { AdvertModel } from '../../models/AdvertModel';
import axios from 'axios';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getQueryString } from '../../helpers/common-methods';
import { FilterModel } from '../../models/FilterModel';
import StartContent from './start-content';
import Search from '../search';
import { FilterData } from '../../models/Models';
import { advertService } from '../../services/advertService';
import { PaginationProps} from 'antd';
import { emptyFilter, paginatorConfig } from '../../helpers/constants';
import AdvertTable from '../advert/advert-table';


const HomePage: React.FC = () => {

  const setFilterFromQuery = () => {
    if (location.pathname === '/') {
      return emptyFilter;
    }
    else {
      return {
        cityId: Number(searchParams.get("cityId")) || undefined,
        areaId: Number(searchParams.get("areaId")) || undefined,
        search: searchParams.get("search") || undefined,
        categoryId: Number(searchParams.get("categoryId")) || undefined,
        isNew: Boolean(searchParams.get("isNew")) || undefined,
        isVip: Boolean(searchParams.get("isVip")) || undefined,
        isContractPrice: Boolean(searchParams.get("isContractPrice")) || undefined,
        priceFrom: Number(searchParams.get("priceFrom")) || undefined,
        priceTo: Number(searchParams.get("priceTo")) || undefined,
        filterValues: searchParams.get("filterValues")
          ? (JSON.parse(searchParams.get("filterValues") || '') as FilterData[])
          : [],
        page: Number(searchParams.get("page")) || paginatorConfig.pagination.defaultCurrent,
        count: Number(searchParams.get("count")) || paginatorConfig.pagination.defaultPageSize,
      }
    }
  }
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams('');
  const [adverts, setAdverts] = useState<AdvertModel[]>([]);
  const [total, setTotal] = useState<number>();
  const [filter, setFilter] = useState<FilterModel>(setFilterFromQuery())
  const [loading, setLoading] = useState<boolean>(false)


  useEffect(() => {
    if (location.pathname !== '/') {
      if (!filter.page) {
        filter.page = paginatorConfig.pagination.defaultCurrent;
        filter.count = paginatorConfig.pagination.defaultPageSize;
      }
      (async () => {
        setLoading(true)
        const formData = new FormData();
        for (const key in filter) {
          if (key === 'filterValues') {
            (filter[key as keyof FilterModel] as FilterData[])?.forEach((item) => {
              formData.append(key, item.id?.toString());
            });
          }
          else {
            formData.append(key, filter[key as keyof FilterModel]?.toString() || '');
          }
        }
        const result = await advertService.getByFilter(formData);
        if (result.status === 200) {
          setAdverts(result.data.elements)
          setTotal(result.data.totalCount)
        }
        setLoading(false)
      })()
      setSearchParams(getQueryString(filter))
    }
    else {
      //Object.assign(filter, emptyFilter)
      setFilter(emptyFilter)
    }
  }, [filter, location.pathname, setSearchParams])

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

  const onPaginationChange: PaginationProps['onShowSizeChange'] = (current: number, pageSize: number) => {
    setFilter({
      ...filter,
      count: pageSize,
      page: current
    })
  };

  return (
    <div className='mt-5'>
      <Search categories={categories} isFilter={location.pathname !== '/'} filter={filter} onSearch={onSearch} />
      {location.pathname === '/'
        ? <StartContent
          categories={categories}
          onCategorySelect={categorySelect} />
        : <AdvertTable
          loading={loading}
          adverts={adverts}
          total={total}
          page={filter.page}
          pageCount={filter.count}
          onChange={onPaginationChange} 
          title='Знайдені оголошення'/>
      }
    </div>
  )
}

export default HomePage