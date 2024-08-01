import React, { useEffect, useState } from 'react'
import { storageService } from '../../services/storangeService'
import user from '../../stores/UserStore'
import { accountService } from '../../services/accountService'
import { message } from 'antd'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { AdvertModel } from '../../models/AdvertModel'
import { observer } from 'mobx-react'

const FavoriteButton: React.FC<AdvertModel> = observer((advert: AdvertModel) => {
    const [favorite, setFavorite] = useState<boolean>(false)

    useEffect(() => {
        if (user.isAuthorized) {
            setFavorite(advert.userFavorites.includes(user.id));
        }
        else {
            if (storageService.isLocalFavorites()) {
                setFavorite(storageService.getLocalFavorites().includes(advert.id))
            }
            else
               setFavorite(false)
        }
    }, [user.isAuthorized,advert])

    const favoriteClick = async (e:any) => {
        e.stopPropagation();
        if (user.isAuthorized) {
            const result = await accountService.toggleFavorite(advert.id)
            if (result.status !== 200) {
                return
            }
        }
        else {
            storageService.toggleFavorites(advert.id)
        }
        message.success(favorite ? 'Оголошення видалено з обраних' : 'Оголошення додано до обраних')
        setFavorite(!favorite)
    }
    return (
        <>
            {favorite
                ? <HeartFilled className=' ms-3 fs-5 text-danger' onClick={favoriteClick} />
                : <HeartOutlined className=' ms-3 fs-5' onClick={favoriteClick} />}
        </>

    )
})

export default FavoriteButton