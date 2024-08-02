import React from 'react'
import { DisabledRowProps } from '../../models/Props'
import { Row } from 'antd'



const DivabledRow:React.FC<DisabledRowProps> = ({enabled,children}) => {
  return (
    <>
    {enabled
    ?<Row gutter={[16,16]}style={{ marginTop: 16 }}>{children}</Row>
    :<>{children}</>
    }
    </>
    
    
  )
}

export default DivabledRow