import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, type UploadFile } from 'antd';
import ImageUpload from '../common-components/ImageUpload';
import { AdvertCreationModel } from '../../models/AdvertCreationModel';

const CreateAdvert: React.FC = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  useEffect(() => {

  }, [files])


  const onFinish = (advert: AdvertCreationModel) => {
    advert.imageFiles = files.map(x => x.originFileObj);
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
              label="Вкажіть назву"
              hasFeedback

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
              label="Категорія"
              rules={[
                {
                  required: true,
                  message: 'Оберіть категорію'
                },
              ]}
            >



            </Form.Item>

          </div>


          <Form.Item
            name='imageFiles'
            label="Фото"
            validateTrigger="filesUpdate"
            rules={[
              () => ({
                validator() {
                  if (files.length > 0) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Оберіть як мінімум одине фото'));
                },
              })

            ]}
          >
            <ImageUpload files={files} setFiles={setFiles} />
          </Form.Item>

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
