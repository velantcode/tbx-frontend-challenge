import React, { useEffect, useState } from 'react'
import RowEmptyTable from './RowEmptyTable'

export default function RowTable ({ data }) {
  const [list, setList] = useState([])

  useEffect(() => {
    setList([])
    const newList = []
    data?.forEach(d => {
      d?.lines?.forEach(l => {
        newList.push({
          fileName: d.file,
          text: l.text,
          number: l.number,
          hex: l.hex
        })
      })
    })

    setList([...newList])
  }, [data])

  return (
    list?.length > 0
      ? list.map((l, i) => (
        <tr key={`item-${i}`}>
          <td className='align-middle' width='20%'>{l.fileName ?? '????'}</td>
          <td className='align-middle'>{l.text ?? '????'}</td>
          <td className='align-middle'>{l.number ?? '????'}</td>
          <td className='align-middle'>{l.hex ?? '????'}</td>
        </tr>
      ))
      : <RowEmptyTable />
  )
}
