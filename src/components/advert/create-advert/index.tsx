import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, Modal, Row, type UploadFile } from 'antd';
import ImageUpload from '../../common-components/ImageUpload';
import { AdvertCreationModel } from '../../../models/AdvertCreationModel';
import CategoryView from '../../category/category-view';
import { CategoryModel } from '../../../models/CategoryModel';
import { categoryService } from '../../../services/categoryService';
import CategoriesGrid from '../../category/categories-grid';


const CreateAdvert: React.FC = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryModel>();

  useEffect(() => {
    (async () => {
      var result = await categoryService.getAll();
      if (result.status === 200) {
        setCategories(result.data)
      }
    })()

  }, [])


  const onFinish = (advert: AdvertCreationModel) => {
    advert.imageFiles = files.map(x => x.originFileObj);
    advert.categoryId = selectedCategory?.id || 0;
  }

  const showModal = () => {
    setIsCategoryModalOpen(true);
  };

  const handleClick = (id: number) => {
    setIsCategoryModalOpen(false);
    setSelectedCategory(categories.find(x => x.id === id))
  };

  const handleClose = () => {
    setIsCategoryModalOpen(false);
  };
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
           
            <div className={`${selectedCategory ? '': 'p-4'} gap-3  rounded-2 d-inline-flex bg-secondary-subtle`}>
              {selectedCategory ? <CategoryView category={selectedCategory} /> : <h5>Оберіть категорію</h5>}
              <Button className='fs-6 align-self-center' onClick={showModal} type='link'>Змінити</Button>
            </div>
            </Form.Item>
          </div>


          <div className='white-container'>
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
              <h6>Перше фото буде на обкладинці оголошення. Перетягніть, щоб змінити порядок фото.</h6>
              <ImageUpload files={files} setFiles={setFiles} />
            </Form.Item>
          </div>


          <div className='buttons-block'>
            <Button type="primary" htmlType="submit">
              Зберегти
            </Button>

          </div>
        </Form>
      </div>

      <Modal
        centered
        closable
        title={<h4>Категорії</h4>}
        open={isCategoryModalOpen}
        onClose={handleClose}
        onCancel={handleClose}
        width={'80%'}
        okButtonProps={{ hidden: true }} >

        <CategoriesGrid categories={categories} handleClick={handleClick}/>
      </Modal>
    </>
  )
}

export default CreateAdvert
