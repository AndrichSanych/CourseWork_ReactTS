import { Card} from 'antd'
import Meta from 'antd/es/card/Meta'
import React from 'react'
import { AdvertViewProps } from '../../../models/Props'
const imagesUrl = (process.env.REACT_APP_SERVER_HOST || '') + process.env.REACT_APP_IMAGES_FOLDER;
const SmallAdvertView: React.FC<AdvertViewProps> = ({ advert, onClick }) => {
    return (
        <Card
            hoverable
            style={{ width: '24%',margin:'0.5%' }}
            cover={
                <img
                    alt={advert.firstImage}
                    src={imagesUrl + "/200_" + advert.firstImage}
                    style={{ objectFit: "cover", aspectRatio: "16/10" }}
                />
            }
        >
            <Meta title={advert.title} description={advert.description} />
        </Card>
    )
}

export default SmallAdvertView