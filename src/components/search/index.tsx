import { EnvironmentOutlined, SearchOutlined, SmileOutlined } from '@ant-design/icons'
import { Form, TreeSelect, TreeSelectProps } from 'antd'
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



const Search: React.FC<SearchProps> = ({ searchString = '', placeId = 0, isArea = false , onSearch}) => {
    const [treeElements, setTreeElements] = useState<TreeElement[]>([]);
    useEffect(() => {
        (async () => {
            var result = await areaService.getAll();
            if (result.status === 200) {
                var elements = result.data.map(x => ({ id: -x.id, value: -x.id, title: x.name, pId: 0, selectable: true, key: -x.id }))
                setTreeElements(elements);
            }
        })()
    }, []);

    const getTreeNode = async (parentId: number) => {
        var result = await cityService.getByAreaId(-parentId);
        if (result.status === 200) {
            return (result.data as CityModel[]).map(x => ({ id: x.id, value: x.id, title: x.name, pId: parentId, isLeaf: true, key: x.id }));
        }
        else return []
    };
    const onLoadData: TreeSelectProps['loadData'] = async ({ id }) => {
        var temp = [...treeElements, ...(await getTreeNode(id))];
        setTreeElements(temp as TreeElement[]);
    }

    const search = (data: SearchData) => {
        if(onSearch){
            var isArea = data.placeId < 0;
            onSearch({searchString:data.searchString, placeId:(isArea ? (-data.placeId) : data.placeId), isArea:isArea});
        }
       
    }

    return (
        <Form
            onFinish={search}
            className='mx-auto'
            style={{
                maxWidth: '80%',
            }}        >
            <div className='search-container'>
                <div className='search-item-container w-50'>
                    <SearchOutlined className=' fs-3' />
                    <Form.Item
                        noStyle
                        name='searchString'
                    >
                        <input
                            placeholder="Що шукаете?"
                            className='no-border'
                            defaultValue={searchString}
                        />
                    </Form.Item>
                </div>
                <div className='search-item-container w-35'>
                    <EnvironmentOutlined className='fs-3' />
                    <Form.Item
                        noStyle
                        name='placeId'
                    >
                        <TreeSelect
                            showSearch
                            defaultValue={placeId !== 0 ? isArea?(-placeId):placeId:null}
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
                        />
                    </Form.Item>
                </div>
                <button className='search-button'>Пошук  <SearchOutlined /></button>
            </div>
        </Form>
    )
}

export default Search