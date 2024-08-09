import React from 'react'
import { AdvertViewProps } from '../../../../models/Props'
import { Card } from 'react-bootstrap';
import FavoriteButton from '../../../favorite-button';
import { Tag } from 'antd';
const imagesUrl = (process.env.REACT_APP_SERVER_HOST || '') + process.env.REACT_APP_IMAGES_FOLDER;
const AdvertCard: React.FC<AdvertViewProps> = ({ advert, onClick = () => { } ,onFavoriteChange=()=>{}}) => {
    const date = new Date(advert.date.split('T')[0]);
    const time = advert.date.split('T')[1].slice(0, 5)
    const today = date.getDate() === new Date(Date.now()).getDate()
    return (
        <Card className='advert-view  h-100' onClick={() => onClick(advert.id)}>
            <Card.Img src={imagesUrl + "/200_" + advert.firstImage} alt={advert.firstImage} style={{ objectFit: "cover", aspectRatio: "16/13", padding: 15 }} />
            <Card.Body style={{ paddingTop: 0 }}>
                <div className=' h-100 d-flex flex-column '>
                    <div style={{ marginBottom: 15 }} className='d-flex flex-column text-start'>
                        <h6 className=' fw-light text-wrap'>{advert.title}</h6>
                        <Tag style={{
                            width: 'fit-content',
                            fontSize: 16,
                            fontWeight: 'lighter'
                            , padding: "2px 5px 2px 5px",
                            borderWidth: 0,
                            backgroundColor: 'lightgray'
                        }}>{advert.isNew ? 'Нове' : 'Вживане'}</Tag>
                    </div>
                    <div className='d-flex  gap-2 text-start mt-auto'>
                        <span>{advert.areaName} обл. {advert.cityName} -</span>
                        {today
                            ? <span>Сьогодні о {time}</span>
                            : <span>{date.toLocaleDateString('ua-UA')}</span>}
                    </div>
                    <div className='d-flex justify-content-between text-start'>
                        <div style={{ marginBottom: 10 }} className='d-flex flex-column'>
                            <span style={{ fontSize: 19 }}>{advert.price === 0 ? 'Безкоштовно' : advert.price + ' грн.'} </span>
                            {advert.isContractPrice ? <span style={{ fontSize: 14, color: 'gray', fontWeight: 'lighter' }}>Договірна</span> : ''}
                        </div>
                        <FavoriteButton advert={advert} onChange={onFavoriteChange}/>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default AdvertCard