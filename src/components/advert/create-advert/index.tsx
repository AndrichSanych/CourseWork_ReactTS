import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, message, Radio, Spin, Switch, TreeSelect, TreeSelectProps, type UploadFile } from 'antd';
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
import { useNavigate, useSearchParams } from 'react-router-dom';
import user from '../../../stores/UserStore'
import { FilterData, TreeElement } from '../../../models/Models';
import Filters from '../../filters';
import { filterTree } from '../../../helpers/common-methods';
import '../../search/Search.css'
import { AdvertModel } from '../../../models/AdvertModel';
import Error from '../../Error'


const CreateAdvert: React.FC = () => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get("id")) | NaN 
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryModel>();
  const [priceStatus, setPriceStatus] = useState<boolean>(true);
  const [treeElements, setTreeElements] = useState<TreeElement[]>([]);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [isVip, setIsVip] = useState<boolean>(true);
  const [publishing, setPublishing] = useState<boolean>(false);
  const [filterValues, setFilterValues] = useState<FilterData[]>([]);
  const [contractPrice, setContractPrice] = useState<boolean>(false);
  const [editAdvert, setEditAdvert] = useState<AdvertModel>();
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    (async () => {
      let advert = undefined;
      const areas = await areaService.getAll();
      if (areas.status === 200) {
        var elements = areas.data.map(x => ({ id: -x.id, value: -x.id, title: x.name, pId: 0, selectable: false, key: -x.id }))
        setTreeElements(elements);
      }
     console.log(id)
      if (id) {
        advert = await advertService.getById(id)
        if (advert?.status === 200) {
          setEditAdvert(advert.data)
        }else{
          setError(true);
        }
      }
      setLoading(false)
     
    })()
  }, []);


  const onFinish = async (advert: AdvertCreationModel) => {
    setPublishing(true);
    advert.isContractPrice = contractPrice;
    advert.categoryId = selectedCategory?.id || 0;
    advert.userId = user.id;
    advert.isNew = isNew;
    advert.isVip = isVip;
    var formData = new FormData();
    Object.keys(advert).forEach(function (key) {
      if (key === 'imageFiles') {
        advert[key]?.forEach((x) => formData.append(key, x?.originFileObj as Blob))
      } else if (key === 'filterValues') {
        advert[key]?.forEach((x) => formData.append(key, x.id?.toString() || ''))
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
    setPublishing(false);
  }

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

  return (
    <>
    <Spin spinning={loading} size='large' fullscreen/>
      {!error && !loading &&
         <div className=' w-70 mx-auto d-flex flex-column align-items-start'>
          <h2 className='my-3 fw-bold'>Створити оголошення</h2>
          <Form
            layout='vertical'
            initialValues={{
              remember: true,
              phoneNumber: user.phoneNumber,
              contactEmail: user.email,
              contactPersone: user.name + ' ' + user.surname
            }}
            onFinish={onFinish}
            className='w-100' >
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
                <Input size='large' className='p-2 no-border no-border-container' placeholder="Наприклад,iPhone 11 з гарантією" showCount minLength={16} maxLength={500} />
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

            {selectedCategory &&
              <div className='white-container'>
                <Form.Item
                  name="filterValues"
                  label={<h6>Характеристики</h6>}
                >
                  <Filters
                    values={filterValues}
                    child={false}
                    onChange={setFilterValues}
                    categoryId={selectedCategory.id} />
                </Form.Item>
              </div>}

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
                  placeholder="Опис"
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
                    <InputNumber className='no-border no-border-container' addonAfter="грн." size='large' />
                  </Form.Item>
                  <div style={{ width: 250 }} className='d-flex justify-content-between' >
                    <h6>Договірна</h6>
                    <Switch defaultValue={false} onChange={setContractPrice} />
                  </div>
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
                  style={{ width: 300 }}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="Оберіть місцезнаходження"
                  allowClear
                  loadData={onLoadData}
                  treeData={treeElements}
                  className='no-border-container search-tree'
                  notFoundContent={
                    <div style={{ textAlign: 'center' }}>
                      <SmileOutlined style={{ fontSize: 20 }} />
                      <p>Дані не знайдені</p>
                    </div>
                  }
                  filterTreeNode={filterTree}
                />
              </Form.Item>
            </div>

            <div className='white-container'>
              <h4>Ваші контактні дані</h4>
              <Form.Item
                name="contactPersone"
                label={<h6>Контактна особа</h6>}
                hasFeedback
                className='fs-3'
                style={{ width: 300 }}
                rules={[
                  {
                    required: true,
                    message: "Не забудьте вказати контактну особу"
                  },
                  {
                    min: 3,
                    message: "Введіть щонайменше 3 символів"
                  },
                ]}
              >
                <Input size='large'
                  className='p-2 no-border no-border-container'
                  placeholder="Контактна особа"
                  showCount minLength={3}
                  maxLength={56}
                  defaultValue={user.name + ' ' + user.surname} />
              </Form.Item>

              <Form.Item
                name="contactEmail"
                label={<h6>Email-адреса</h6>}
                hasFeedback
                className='fs-3'
                style={{ width: 300 }}>
                <Input
                  size='large'
                  readOnly
                  className='p-2 no-border no-border-container'
                  placeholder="Email-адреса" />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                label={<h6>Номер телефону</h6>}
                hasFeedback
                className='fs-3'
                style={{ width: 300 }}
                rules={[
                  {
                    required: true,
                    message: "Не забудьте вказати контактний номер телефону"
                  },
                  {
                    pattern: RegExp('^\\d{3}[-\\s]{1}\\d{3}[-\\s]{1}\\d{2}[-\\s]{0,1}\\d{2}$'),
                    message: "Невірно введений телефон!(xxx-xxx-xx-xx) (xxx xxx xx xx) (xxx xxx xxxx) (xxx-xxx-xxxx)",
                  },
                ]}
              >
                <Input
                  size='large'
                  className='p-2 no-border no-border-container'
                  placeholder="Номер телефону" />
              </Form.Item>
            </div>



            <div className='d-flex justify-content-end'>
              <Button loading={publishing} size='large' htmlType="submit">
                Опублікувати
              </Button>
            </div>
          </Form>
        </div>}
        { !loading && error && <Error
          status="500"
          title="Упс...виникла помилка"
          subTitle="Помилка звантаження інформації"
        />}
    </>
  )
}

export default CreateAdvert
