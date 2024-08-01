import { EnvironmentOutlined, SearchOutlined, SmileOutlined } from '@ant-design/icons'
import { Col, Form, Input, Row, Select, Spin, TreeSelect, TreeSelectProps } from 'antd'
import React, { useEffect, useState } from 'react'
import '../search/Search.css'
import { areaService } from '../../services/areaService'
import { cityService } from '../../services/cityService'
import { CityModel } from '../../models/CityModel'
import { TreeElement } from '../../models/Models'
import { SearchProps } from '../../models/Props'


interface SearchData {
    searchString: string
    placeId: number
}


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
            categoryId: id
        })
    }

    const onStateChange = (state: boolean) => {
        onSearch({ ...filter, isNew: state })
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
                                ? <Spin className=' align-self-center mx-auto' size='small' spinning={loading} />
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
                    <div className='w-70 mx-auto my-5'>
                        <h3>Фільтри</h3>
                        <div>
                            <Row gutter={15}>
                                <Col span={6}>
                                    <div className='filter-item-container'>
                                        <span>Kатегорія</span>
                                        <div className='filter-element-container'>
                                            <Select
                                                allowClear
                                                defaultValue={filter?.categoryId}
                                                placeholder='Категорія'
                                                className='w-100 filter-element'
                                                size='large'
                                                options={categories?.map(x => ({ value: x.id, label: x.name }))}
                                                onChange={onCategoryChange} />
                                        </div>
                                    </div>
                                </Col>
                                <Col span={6}>
                                    <div className='filter-item-container'>
                                        <span>Стан</span>
                                        <div className='filter-element-container'>
                                            <Select
                                                defaultValue={filter?.isNew}
                                                placeholder='Стан'
                                                className='w-100 filter-element'
                                                size='large'
                                                options={
                                                    [{ value: null, label: 'Всі оголошення' },
                                                    { value: true, label: 'Нове' },
                                                    { value: false, label: 'Вживане' }]
                                                }
                                                onChange={onStateChange} />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>}
        </>

    )
}

export default Search