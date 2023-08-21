import React from 'react'

export const IndividualData = ({ individualExcelData }) => {
    

    return (
        <>  
            <th className='border'>{individualExcelData.Type}</th>
            <th className='border'>{individualExcelData.Description}</th>
            <th className='border'>{individualExcelData['Goods Group']}</th>
            <th className='border'>{individualExcelData.Manufacturer}</th>
            <th className='border'>{individualExcelData.Product}</th>
        </>
    )
}
