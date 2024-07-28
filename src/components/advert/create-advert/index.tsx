import React, { useEffect, useState } from 'react';
import { Button, Form, GetProp, Input, InputNumber, message, Radio, Switch, TreeSelect, TreeSelectProps, type UploadFile } from 'antd';
import ImageUpload from '../../common-components/ImageUpload';
import { AdvertCreationModel } from '../../../models/AdvertCreationModel';
import { CategoryModel } from '../../../models/CategoryModel';
import CategorySelector from '../../category/category-selector';
import './CreateAdvert.css'
import TextArea from 'antd/es/input/TextArea';
import { areaService } from '../../../services/areaService';
import { SmileOutlined } from '@ant-design/icons';
import { cityService } from '../../../services/cityService';
import { CityModel } from '../../../models/CityModel';
import { advertService } from '../../../services/advertService';
import { useNavigate } from 'react-router-dom';
import user from '../../../stores/UserStore'

const CreateAdvert: React.FC = () => {
  type DefaultOptionType = GetProp<TreeSelectProps, 'treeData'>[number];
  const navigate = useNavigate();
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryModel>();
  const [priceStatus, setPriceStatus] = useState<boolean>(true);
  const [treeElements, setTreeElements] = useState<Omit<DefaultOptionType, 'label'>[]>([]);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [isVip, setIsVip] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      var result = await areaService.getAll();
      if (result.status === 200) {
        var elements = result.data.map(x => ({ id: x.id, value: x.id, title: x.name, pId: 0, selectable: false }))
        setTreeElements(elements);
      }
    })()
  }, []);

  const onFinish = async (advert: AdvertCreationModel) => {
    advert.categoryId = selectedCategory?.id || 0;
    advert.userId = user.id;
    advert.isNew = isNew;
    advert.isVip = isVip;
    var formData = new FormData();
    Object.keys(advert).forEach(function (key) {
      if (key === 'imageFiles') {
        advert[key]?.forEach((x) => formData.append(key, x?.originFileObj as Blob))
      }
      else {
        var value = advert[key as keyof AdvertCreationModel];
        if (value) {
          if (typeof (value) !== 'string')
            formData.append(key, value.toString());
          else
            formData.append(key, value);
        }
      }
    });
    var result = await advertService.create(formData)
    if (result.status === 200) {
      message.success('Оголошення успішно опубліковано');
      navigate(-1)
    }
  }

  const getTreeNode = async (parentId: number) => {
    var result = await cityService.getByAreaId(parentId);
    if (result.status === 200) {
      return (result.data as CityModel[]).map(x => ({ id: x.id, value: x.id, title: x.name, pId: parentId, isLeaf: true }));
    }
    else return []
  };


  const onLoadData: TreeSelectProps['loadData'] = async ({ id }) => {
    var temp = [...treeElements, ...(await getTreeNode(id))];
    setTreeElements(temp);
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
            <h4>Додаткова інформація</h4>
            <div className='d-flex flex-column gap-1'>
              <h6>Стан</h6>
              <Radio.Group defaultValue="new" onChange={(e) => setIsNew(e.target.value === 'new')} size="large" buttonStyle="solid">
                <Radio.Button value="new">Нове</Radio.Button>
                <Radio.Button value="old">Вживане</Radio.Button>
              </Radio.Group>
            </div>
            <div className='d-flex flex-column gap-1'>
              <h6>Статус</h6>
              <Radio.Group defaultValue="vip" onChange={(e) => setIsVip(e.target.value === 'vip')} size="large" buttonStyle="solid">
                <Radio.Button value="vip">VIP оголошення</Radio.Button>
                <Radio.Button value="normal">Звичайне</Radio.Button>
              </Radio.Group>
            </div>
          </div>

          <div className='white-container'>
            <Radio.Group defaultValue="price" onChange={(e) => setPriceStatus(e.target.value === 'price')} size="large" buttonStyle="solid">
              <Radio.Button value="price">Ціна</Radio.Button>
              <Radio.Button value="free">Безкоштовно</Radio.Button>
            </Radio.Group>
            {priceStatus &&
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
                treeDataSimpleMode
                treeCheckable={false}
                size='large'
                showSearch
                style={{ width: 250 }}
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
              />
            </Form.Item>
          </div>

          <div className='d-flex justify-content-end'>
            <Button size='large' htmlType="submit">
              Опублікувати
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}

export default CreateAdvert
