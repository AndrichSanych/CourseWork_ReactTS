import React from 'react'
import { AdvertViewProps } from '../../../../models/Props'
import { Tag } from 'antd';
import FavoriteButton from '../../../favorite-button';
const imagesUrl = (process.env.REACT_APP_SERVER_HOST || '') + process.env.REACT_APP_IMAGES_FOLDER;
const HorisontalAdvertCard: React.FC<AdvertViewProps> = ({ advert, onClick = () => { },onFavoriteChange=()=>{} }) => {
    const date = new Date(advert.date.split('T')[0]);
    const time = advert.date.split('T')[1].slice(0, 5)
    const today = date.getDate() === new Date(Date.now()).getDate()
    return (
        <div className='d-flex gap-2 bg-white p-2 advert-view' onClick={() => onClick(advert.id)}>
            <img
                src={imagesUrl + "/200_" + advert.firstImage}
                alt={advert.firstImage}
                style={{
                    objectFit: "cover",
                    aspectRatio: "16/12",
                    height: 180,
                    borderRadius: 5
                }} />
            <div className='d-flex flex-column justify-content-between w-100 p-1'>
                <div className='d-flex flex-column gap-1'>
                    <div className='d-flex justify-content-between'>
                        <span className='fs-4' >{advert.title}</span>
                        <div style={{ marginBottom: 10 }} className='d-flex gap-0 flex-column'>
                            <span style={{ fontSize: 19,fontWeight:'bold' }}>{advert.price === 0 ? 'Безкоштовно' : advert.price + ' грн.'} </span>
                            {advert.isContractPrice ? <span style={{ fontSize: 14, color: 'gray', fontWeight: 'lighter' }}>Договірна</span> : ''}
                        </div>
                    </div>
                    <Tag style={{
                        width: 'fit-content',
                        fontSize: 16,
                        fontWeight: 'lighter'
                        , padding: "2px 5px 2px 5px",
                        borderWidth: 0,
                        backgroundColor: 'lightgray'
                    }}>{advert.isNew ? 'Нове' : 'Вживане'}</Tag>
                </div>
                <div className='d-flex justify-content-between'>
                    <div style={{ fontSize: 13 }} className='d-flex  gap-2 text-start mt-auto'>
                        <span>{advert.areaName} обл. {advert.cityName} -</span>
                        {today
                            ? <span>Сьогодні о {time}</span>
                            : <span>{date.toLocaleDateString('ua-UA')}</span>}
                    </div>
                    <FavoriteButton advert={advert} onChange={onFavoriteChange} />
                </div>
            </div>
        </div>
    )
}

export default HorisontalAdvertCard