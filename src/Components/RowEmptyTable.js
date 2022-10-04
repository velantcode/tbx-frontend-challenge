import React from 'react'

export default function RowEmptyTable ({ loading }) {
  return (
    <tr>
      <td className='text-center align-middle' colSpan={4}>
        {
          loading
            ? 'Cargando ...'
            : 'No existen archivos que mostrar.'
        }
      </td>
    </tr>
  )
}
