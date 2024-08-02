
import React from 'react'
import { AdvertViewProps } from '../../../models/Props'
import { Card } from 'react-bootstrap';

import FavoriteButton from '../../favorite-button';
const imagesUrl = (process.env.REACT_APP_SERVER_HOST || '') + process.env.REACT_APP_IMAGES_FOLDER;
const SmallAdvertView: React.FC<AdvertViewProps> = ({ advert, onClick = () => { } }) => {

    const date = new Date(advert.date.split('T')[0]);
    const time = advert.date.split('T')[1].slice(0, 8)
    const today = date.getDate() === new Date(Date.now()).getDate()

    return (
        <Card className='small-advert-view' onClick={() => onClick(advert.id)}>
            <Card.Img src={imagesUrl + "/200_" + advert.firstImage} alt={advert.firstImage} style={{ objectFit: "cover", aspectRatio: "16/12" }} />
            <Card.Body>
                <div className=' h-100 d-flex flex-column '>
                    <div className='d-flex flex-column text-start'>
                        <div className='d-flex justify-content-between text-start align-items-lg-start'>
                            <h6 className=' fw-light text-wrap'>{advert.title}</h6>
                            <FavoriteButton {...advert} />
                        </div>
                        <h5>{advert.price === 0 ? 'Безкоштовно' : advert.price + ' грн.'}  {advert.isContractPrice ? <span className=' fs-6'>(Договірна)</span> : ''}</h5>
                    </div>
                    <div className='d-flex flex-column text-start mt-auto'>
                        <span>{advert.cityName}</span>
                        {today
                            ? <span>Сьогодні о {time}</span>
                            : <span>{new Date(advert.date.split('T')[0]).toLocaleDateString('ua-UA')}</span>}
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default SmallAdvertView