import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Radio, Switch, TreeSelect, type UploadFile } from 'antd';
import ImageUpload from '../../common-components/ImageUpload';
import { AdvertCreationModel } from '../../../models/AdvertCreationModel';
import { CategoryModel } from '../../../models/CategoryModel';
import CategorySelector from '../../category/category-selector';
import './CreateAdvert.css'
import TextArea from 'antd/es/input/TextArea';
import { AreaModel } from '../../../models/AreaModel';
import { areaService } from '../../../services/areaService';

interface TreeSelectElement{
    value:number,
    title: string,
    children: TreeSelectElement[]
}

const CreateAdvert: React.FC = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryModel>();
  const [priceStatus, setPriceStatus] = useState<string>('price');
  const [treeElements,setTreeElements]  = useState<TreeSelectElement[]>([])

  useEffect(()=>{
    (async ()=>{
      var result = await areaService.getAll();
      if(result.status === 200){
        var elements = result.data.map<TreeSelectElement>(x=> ({value: x.id , title: x.name,children:[]}))
        setTreeElements(elements);
      }
    })()
  },[]);

  const onFinish = (advert: AdvertCreationModel) => {

    advert.categoryId = selectedCategory?.id || 0;
    console.log(advert)
  }

  const onTreeExpand = ()=>{

  }

  return (
    <>
      <div className=' mx-auto d-flex flex-column align-items-start'>
        <h2 className='my-3 fw-bold'>Створити оголошення</h2>
        <Form
          layout='vertical'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          className='w-100'
        >
          <div className='white-container'>
            <h4>Опишіть у подробицях</h4>
            <Form.Item
              name="title"
              label={<h6>Вкажіть назву</h6>}
              hasFeedback
              className='fs-3'
              rules={[
                {
                  pattern: RegExp('^[A-Z А-Я].*'),
                  message: "Заголовок повинен починатися з великої букви"
                },
                {
                  required: true,
                  message: "Не забудьте заповнити заголовок"
                },
                {
                  min: 16,
                  message: "Введіть щонайменше 16 символів"
                },
              ]}
            >
              <Input size='large' className='p-2' placeholder="Наприклад,iPhone 11 з гарантією" showCount minLength={16} maxLength={500} />
            </Form.Item>
            <Form.Item
              hasFeedback
              name="categoryId"
              label={<h6>Категорія</h6>}
              rules={[
                {
                  required: true,
                  message: 'Оберіть категорію'
                },
              ]}
            >
              <CategorySelector category={selectedCategory} onChange={setSelectedCategory} />
            </Form.Item>
          </div>


          <div className='white-container'>
            <Form.Item
              name='imageFiles'
              label={<h6>Фото</h6>}
              rules={[
                {
                  required: true,
                  message: 'Оберіть як мінімум одине фото'
                },
              ]}>
              <ImageUpload files={files} onChange={setFiles} />
            </Form.Item>
          </div>

          <div className='white-container'>
            <Form.Item
              name='description'
              label={<h6>Опис</h6>}
              rules={[
                {
                  pattern: RegExp('^[A-Z А-Я].*'),
                  message: "Опис повинен починатися з великої букви"
                },
                {
                  required: true,
                  message: "Не забудьте заповнити опис"
                },
                {
                  min: 40,
                  message: "Введіть щонайменше 40 символів"
                },
              ]}>
              <TextArea
                showCount
                maxLength={9000}
                placeholder="disable resize"
                style={{ height: 300, resize: 'none' }}
              />
            </Form.Item>
          </div>

          <div className='white-container'>
            <Radio.Group defaultValue="price" onChange={(e) => setPriceStatus(e.target.value)} size="large" buttonStyle="solid">
              <Radio.Button value="price">Ціна</Radio.Button>
              <Radio.Button value="free">Безкоштовно</Radio.Button>
            </Radio.Group>
            {priceStatus === 'price' &&
              <>
                <Form.Item
                  name='price'
                  label={<h6>Ціна за 1 шт.</h6>}
                  rules={[
                    {
                      required: true,
                      message: "Не забудьте заповнити ціну"
                    }
                  ]}>
                  <InputNumber addonAfter="грн." size='large' />
                </Form.Item>

                <Form.Item
                  name='isContractPrice'>
                  <div style={{ width: 250 }} className='d-flex justify-content-between' >
                    <h6>Договірна</h6>
                    <Switch defaultValue={false} />
                  </div>
                </Form.Item>
              </>
            }
          </div>

          <div className='white-container'>
            <Form.Item
              name='cityId'
              label={<h6>Місцезнаходження</h6>}
              rules={[
                {
                  required: true,
                  message: "Не забудьте обрати місцезнаходження"
                }
              ]}>
              <TreeSelect
                size='large'
                showSearch
                style={{ width: 250 }}
                //value={value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Оберіть місцезнаходження"
                allowClear
                onTreeExpand={onTreeExpand}              
              // onChange={onChange}
               treeData={treeElements}
              />
            </Form.Item>
          </div>

          <div className='buttons-block'>
            <Button type="primary" htmlType="submit">
              Зберегти
            </Button>

          </div>
        </Form>
      </div>


    </>
  )
}

export default CreateAdvert
