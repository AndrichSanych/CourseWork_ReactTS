import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import Error from '../Error'
import { AdvertModel } from '../../models/AdvertModel';
import axios from 'axios';
import { advertService } from '../../services/advertService';

const AdvertPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [advert,setAdvert] = useState<AdvertModel>()
  const id = Number(searchParams.get("id")) || undefined

  useEffect(() => {
    if(id){
      (async () => {
        const [advert] = await axios.all(
          [
            advertService.getById(id)
          ])
        if (advert?.status === 200)
          setAdvert(advert.data)
      })()
    }
    

  }, [])

  return (
    <>
      {id
        ? <div className="text-muted  w-100 d-flex  p-1 rounded border border-1 bg-white">
            <h1>{advert?.title}</h1>
        </div>
        : <Error
          status="500"
          title="Упс...виникла помилка"
          subTitle="Помилка ідентифікатора оголошення"
        />
      }

    </>

  )
}

export default AdvertPage