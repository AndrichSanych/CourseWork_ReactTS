import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Radio, Switch, type UploadFile } from 'antd';
import ImageUpload from '../../common-components/ImageUpload';
import { AdvertCreationModel } from '../../../models/AdvertCreationModel';
import { CategoryModel } from '../../../models/CategoryModel';
import CategorySelector from '../../category/category-selector';
import './CreateAdvert.css'
import TextArea from 'antd/es/input/TextArea';



const CreateAdvert: React.FC = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryModel>();
  const [priceStatus, setPriceStatus] = useState<string>('price')

  const onFinish = (advert: AdvertCreationModel) => {

    advert.categoryId = selectedCategory?.id || 0;
    console.log(advert)
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
                  label={<h6>Ціна за 1 шт.</h6>}>
                  <InputNumber addonAfter="грн." size='large' />
                </Form.Item>

                <Form.Item
                  noStyle
                  name='isContractPrice'
                  valuePropName="checked">
                  
                    <h6>Договірна</h6>
                    <Switch />
                  </div>

                </Form.Item>
              </>

            }
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
