import { Badge } from 'antd'
import React from 'react'
import { AdvertModel } from '../../../models/AdvertModel'

const AdVertView: React.FC<AdvertModel> = (advert) => {
    return (
        <div className="text-muted  w-100 d-flex  p-1 rounded border border-1 bg-white">
            <div style={{ minHeight: 140, minWidth: 200, maxHeight: 140, maxWidth: 200 }}>
                <img style={{ objectFit: 'cover' }} src="@item.FirstImage" className="h-100 w-100 rounded-start" alt='' />
            </div>
            <div className="d-flex flex-column  p-1 w-100 mx-3">
                
                
               
            </div>
        </div>
    )
}

export default AdVertView