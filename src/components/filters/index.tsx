import React, { useEffect, useState } from 'react'
import { AdvertFitersProps } from '../../models/Props'
import { AdvertFilterModel } from '../../models/AdvertFilterModel'
import { filterService } from '../../services/filterService'
import { Col, Row, Select } from 'antd'
import { FilterData } from '../../models/Models'
import '../search/Search.css'
import DivabledRow from '../common-components/DivabledRow'



const Filters: React.FC<AdvertFitersProps> = ({row, categoryId, values, bordered, onChange = () => { } }) => {
    const [categoryFilters, setCategoryFilters] = useState<AdvertFilterModel[]>([])
    const [filterValues, setFilterValues] = useState<FilterData[]>([])


    useEffect(() => {
        (async () => {
            if (categoryId) {
                var result = await filterService.getCategoryFilters(categoryId)
                if (result.status === 200) {
                    setCategoryFilters(result.data)
                }
            }
        })()

    }, [categoryId])

    const onFilterChange = (data: FilterData) => {
        var values = [...filterValues];
        const element = values.find(x => x.filterId === data.filterId)
        let index = undefined;
        if (element) {
            index = values.indexOf(element)
            if (index >= 0) {
                values.splice(index, 1);
            }
        }
        if (data.valueId) {
            values.push(data)
        }
        setFilterValues(values);
        onChange(values)
    }

    return (

        <DivabledRow enabled={row}>
            {categoryFilters.map((filter, index) =>
                <Col
                    sm={{ span: 24 }}
                    md={{ span: 24 }}
                    lg={{ span: 12 }}
                    xl={{ span: 8 }}
                    xxl={{ span: 6 }}
                    key={index}>
                    <div className='filter-item-container'>
                        <span>{filter.name}</span>
                        <div className='filter-element-container'>
                            <Select
                                allowClear
                                defaultValue={values?.find(x => x.filterId === filter.id)?.valueId}
                                placeholder={filter.name}
                                className={`w-100  ${bordered ? '' : 'filter-element no-border'} `}
                                size='large'
                                options={filter.values?.map(x => ({ value: x.id, label: x.value }))}
                                onChange={(valueId) => onFilterChange({ filterId: filter.id, valueId: valueId })} />

                        </div>
                    </div>
                </Col>
            )}

        </DivabledRow>
    )
}

export default Filters