import { EnvironmentOutlined, SearchOutlined, SmileOutlined } from '@ant-design/icons'
import { Col, Form, Input, InputNumber, Row, Select, Space, Spin, TreeSelect, TreeSelectProps } from 'antd'
import React, { FocusEvent, useEffect, useState } from 'react'
import './Search.css'
import { areaService } from '../../services/areaService'
import { cityService } from '../../services/cityService'
import { CityModel } from '../../models/CityModel'
import { FilterData, SearchData, TreeElement } from '../../models/Models'
import { SearchProps } from '../../models/Props'
import Filters from '../filters'


const Search: React.FC<SearchProps> = ({ filter, isFilter, onSearch = () => { }, categories }) => {
    const [treeElements, setTreeElements] = useState<TreeElement[]>([]);
    const [loading, setLoading] = useState<boolean>(true)
    const [form] = Form.useForm();
    useEffect(() => {
        (async () => {
            var result = await areaService.getAll();
            if (result.status === 200) {
                var elements = result.data.map(x => ({ id: -x.id, value: -x.id, title: x.name, pId: 0, isLeaf: false, selectable: true, key: -x.id }))
                if (filter?.cityId) {
                    elements = [...elements, ...(await getTreeNode(filter.areaId ? -filter.areaId : undefined))];
                }
                setTreeElements(elements);
            }
            setLoading(false)
        })()
    }, []);

    useEffect(() => {
        form.setFieldValue('searchString', filter?.search)
        form.setFieldValue('placeId', filter?.cityId ? filter?.cityId : (filter?.areaId ? -filter?.areaId : undefined))
    }, [filter])

    const getTreeNode = async (parentId: number | undefined) => {
        if (parentId) {
            var result = await cityService.getByAreaId(-parentId);
            if (result.status === 200) {
                return (result.data as CityModel[]).map(x => ({ id: x.id, value: x.id, title: x.name, pId: parentId, selectable: true, isLeaf: true, key: x.id }));
            }
        }
        return []
    };
    const onLoadData: TreeSelectProps['loadData'] = async ({ id }) => {
        var temp = [...treeElements, ...(await getTreeNode(id))];
        setTreeElements(temp as TreeElement[]);
    }

    const onFinish = (data: SearchData) => {
        var areaId = undefined;
        var cityId = undefined;
        if (data.placeId < 0) {
            areaId = (-data.placeId);
        }
        else {
            cityId = data.placeId;
            areaId = treeElements.find(x => x.id === data.placeId)?.pId;
            if (areaId) {
                areaId = -areaId;
            }
        }
        onSearch({
            ...filter,
            cityId: cityId,
            areaId: areaId,
            search: data.searchString
        })
    }
    const onCategoryChange = (id: number) => {
        onSearch({
            ...filter,
            categoryId: id,
            filterValues: id ? filter?.filterValues : []
        })
    }

    const onStateChange = (state: boolean) => {
        onSearch({ ...filter, isNew: state })
    }
    const onVipChange = (state: boolean) => {
        onSearch({ ...filter, isVip: state })
    }
    const onContractPriceChange = (state: boolean) => {
        onSearch({ ...filter, isContractPrice: state })
    }

    const onPriceFromChange = (value: FocusEvent<HTMLInputElement>) => {
        onSearch({ ...filter, priceFrom: value.target.value })
    }

    const onPriceToChange = (value: FocusEvent<HTMLInputElement>) => {
        onSearch({ ...filter, priceTo: value.target.value })
    }

    
    const onFiltersChange = (data:FilterData)=>{
         onSearch({ ...filter, filterValues: data })
    }

    return (
        <>
            <Form
                form={form}
                onFinish={onFinish}
                className='mx-auto'
            >
                <div className='search-container'>
                    <div className='search-item-container w-50'>
                        <SearchOutlined className=' fs-3' />
                        <Form.Item
                            noStyle
                            name='searchString'
                        >
                            <Input
                                placeholder="Що шукаете?"
                                className='no-border w-100'
                                allowClear
                                autoComplete='off'
                            />
                        </Form.Item>
                    </div>
                    <div className='search-item-container w-35'>
                        <EnvironmentOutlined className='fs-3' />
                        <Form.Item
                            noStyle
                            name='placeId'
                        >
                            {loading
                                ? <Spin className=' align-self-center mx-auto' size='small' spinning />
                                : <TreeSelect
                                    loading={loading}
                                    showSearch
                                    treeDataSimpleMode
                                    treeCheckable={false}
                                    size='large'
                                    className='w-100 search-tree'
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    placeholder="Оберіть місцезнаходження"
                                    allowClear
                                    loadData={onLoadData}
                                    treeData={treeElements}
                                    notFoundContent={
                                        <div style={{ textAlign: 'center' }}>
                                            <SmileOutlined style={{ fontSize: 20 }} />
                                            <p>Дані не знайдені</p>
                                        </div>
                                    }
                                    filterTreeNode={(search, item) => {
                                        var res = false;
                                        if (item.title) {
                                            res = item.title?.toLocaleString()?.toLocaleLowerCase()?.indexOf(search.toLowerCase()) >= 0;
                                        }
                                        return res;
                                    }}
                                />}
                        </Form.Item>
                    </div>
                    <button className='search-button'>Пошук  <SearchOutlined /></button>
                </div>
            </Form>
            {isFilter &&
                <div className='mt-5'>
                    <div className=' w-70 mx-auto my-5'>
                        <h3>Фільтри</h3>
                        <div>
                            <Row gutter={[16, 16]}>
                                <Col
                                    sm={{ span: 24 }}
                                    md={{ span: 24 }}
                                    lg={{ span: 12 }}
                                    xl={{ span: 8 }}
                                    xxl={{ span: 5 }}
                                    key={'categiry'}>
                                    <div className='filter-item-container'>
                                        <span>Kатегорія</span>
                                        <div className='filter-element-container'>
                                            {categories?.length === 0
                                                ? <Spin spinning size='small' className='align-self-center mx-auto' />
                                                : <Select
                                                    allowClear
                                                    defaultValue={filter?.categoryId}
                                                    placeholder='Категорія'
                                                    className='w-100 filter-element'
                                                    size='large'
                                                    options={categories?.map(x => ({ value: x.id, label: x.name }))}
                                                    onChange={onCategoryChange} />}

                                        </div>
                                    </div>
                                </Col>
                                <Col
                                    sm={{ span: 24 }}
                                    md={{ span: 24 }}
                                    lg={{ span: 12 }}
                                    xl={{ span: 8 }}
                                    xxl={{ span: 5 }}
                                    key={'c-price'}>
                                    <div className='filter-item-container'>
                                        <span>Договірна ціна</span>
                                        <div className='filter-element-container'>
                                            <Select
                                                defaultValue={filter?.isContractPrice}
                                                placeholder='Договірна ціна'
                                                className='w-100 filter-element'
                                                size='large'
                                                allowClear
                                                options={
                                                    [{ value: true, label: 'Договірна' },
                                                    { value: false, label: 'Не договірна' }]
                                                }
                                                onChange={onContractPriceChange} />
                                        </div>
                                    </div>
                                </Col>
                                <Col
                                    sm={{ span: 24 }}
                                    md={{ span: 24 }}
                                    lg={{ span: 12 }}
                                    xl={{ span: 8 }}
                                    xxl={{ span: 5 }}
                                    key={'state'}>
                                    <div className='filter-item-container'>
                                        <span>Стан</span>
                                        <div className='filter-element-container'>
                                            <Select
                                                defaultValue={filter?.isNew}
                                                placeholder='Стан'
                                                className='w-100 filter-element'
                                                size='large'
                                                allowClear
                                                options={
                                                    [{ value: true, label: 'Нове' },
                                                    { value: false, label: 'Вживане' }]
                                                }
                                                onChange={onStateChange} />
                                        </div>
                                    </div>
                                </Col>
                                <Col
                                    sm={{ span: 24 }}
                                    md={{ span: 24 }}
                                    lg={{ span: 12 }}
                                    xl={{ span: 8 }}
                                    xxl={{ span: 5 }}
                                    key={'vip'}>
                                    <div className='filter-item-container'>
                                        <span>VIP оголошення</span>
                                        <div className='filter-element-container'>
                                            <Select
                                                defaultValue={filter?.isVip}
                                                placeholder='VIP оголошення'
                                                className='w-100 filter-element'
                                                size='large'
                                                allowClear
                                                options={
                                                    [{ value: true, label: 'Vip' },
                                                    { value: false, label: 'Звичайне' }]
                                                }
                                                onChange={onVipChange} />
                                        </div>
                                    </div>
                                </Col>
                                <Col
                                    sm={{ span: 24 }}
                                    md={{ span: 24 }}
                                    lg={{ span: 12 }}
                                    xl={{ span: 8 }}
                                    xxl={{ span: 4 }}
                                    key={'d-price'}>
                                    <div className='filter-item-container'>
                                        <span>Діапазон цін</span>
                                        <Space>
                                            <div className='filter-element-container'>
                                                <InputNumber
                                                    defaultValue={filter?.priceFrom}
                                                    placeholder='Від'
                                                    className='w-100 filter-element no-border'
                                                    size='large'
                                                    onBlur={onPriceFromChange}

                                                />
                                            </div>
                                            <div className='filter-element-container'>
                                                <InputNumber
                                                    defaultValue={filter?.priceTo}
                                                    placeholder='До'
                                                    className='w-100 filter-element no-border'
                                                    size='large'
                                                    onBlur={onPriceToChange}
                                                />
                                            </div>
                                        </Space>

                                    </div>
                                </Col>
                                {filter?.categoryId
                                    && <Filters onChange={onFiltersChange} values={filter.filterValues} bordered={false} child={true} categoryId={filter.categoryId} />}
                            </Row>
                        </div>

                    </div>
                </div>}
        </>

    )
}

export default Search