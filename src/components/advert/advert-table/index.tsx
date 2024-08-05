import React, { useState } from 'react'
import { AdvertTableProps } from '../../../models/Props'
import { Col, Divider, Empty, Pagination, Row, Select, Spin } from 'antd'
import AdvertCard from '../advert-cards/card'
import { useNavigate } from 'react-router-dom'
import { paginatorConfig } from '../../../helpers/constants'
import { TableOutlined, UnorderedListOutlined } from '@ant-design/icons'
import '../../search/Search.css'
import HorisontalAdvertCard from '../advert-cards/horizontal-card'

const AdvertTable: React.FC<AdvertTableProps> = ({ loading, adverts = [], page,title, total, pageCount, onChange = () => { } }) => {
    const navigate = useNavigate();
    const [tableStyle, setTableStyle] = useState<boolean>(false)
    return (
        <>{!loading && adverts.length > 0
            ? <div className='d-flex flex-column gap-2 w-70 mx-auto'>
                 <Divider orientation='left' style={{borderColor: 'gray' ,fontSize:18}}>{title}</Divider>
                <div className='px-5 d-flex gap-4 justify-content-end fs-3 text-body-secondary align-items-center'>
                    <span style={{ fontSize: 16 }}>Сортувати за:</span>
                    <div className='filter-element-container'>
                        <Select
                            allowClear
                            style={{ minWidth: 200 }}
                            className='filter-element'
                            placeholder='Не сортоване'
                            size='large'
                            options={[
                                { value: 1, label: ' Найновіші ' },
                                { value: 2, label: ' Найдорожчі ' },
                                { value: 3, label: ' Найдешевші ' }
                            ]}
                            defaultValue={undefined} />
                    </div>
                    <UnorderedListOutlined style={{ color: tableStyle ? 'gray' : 'black' }} onClick={() => setTableStyle(false)} />
                    <TableOutlined style={{ color: tableStyle ? 'black' : 'gray' }} onClick={() => setTableStyle(true)} />
                </div>
                <h3>Ми знайшли  {adverts.length < 1000 ? adverts.length : ' більше 1000'}
                    {adverts.length < 5 ? ' оголошення' : ' оголошень'}</h3>
                {tableStyle
                    ? <Row gutter={[10, 10]}>
                        {adverts.map((advert, index) =>
                            <Col
                                sm={{ span: 24 }}
                                md={{ span: 24 }}
                                lg={{ span: 12 }}
                                xl={{ span: 8 }}
                                xxl={{ span: 6 }}
                                key={index}>
                                <AdvertCard advert={advert} onClick={(id: number) => navigate(`/advert?id=${id}`)} />
                            </Col>)}

                    </Row>
                    : <div className='d-flex flex-column gap-2'>
                        {adverts.map(x => <HorisontalAdvertCard advert={x} onClick={(id: number) => navigate(`/advert?id=${id}`)} />)}
                    </div>}

                <Pagination
                    align="center"
                    showSizeChanger
                    showQuickJumper
                    pageSizeOptions={paginatorConfig.pagination.pageSizeOptions}
                    locale={paginatorConfig.pagination.locale}
                    showTotal={paginatorConfig.pagination.showTotal}
                    current={page || paginatorConfig.pagination.defaultCurrent}
                    total={total}
                    pageSize={pageCount || paginatorConfig.pagination.defaultPageSize}
                    onChange={onChange} />
            </div>
            : <>{loading ? <Spin className='d-block mx-auto' size='large' /> : <Empty />}</>}</>
    )
}

export default AdvertTable