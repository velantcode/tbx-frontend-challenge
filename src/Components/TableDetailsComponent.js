import React from 'react'
import { Table } from 'react-bootstrap'

export default function TableDetailsComponent ({ fileData }) {
  return (
    <div className='row'>
      <div className='col-12 table-max-height-modal'>
        <Table striped bordered hover responsive>
          <thead className='border-bottom'>
            <tr>
              <th className='align-middle'>Text</th>
              <th className='align-middle'>Number</th>
              <th className='align-middle'>Hex</th>
            </tr>
          </thead>
          <tbody>
            {
            fileData?.lines?.length > 0 && fileData.lines.map((l, i) =>
              <tr key={`item-${i}`}>
                <td className='align-middle'>{l.text ?? '????'}</td>
                <td className='align-middle'>{l.number ?? '????'}</td>
                <td className='align-middle'>{l.hex ?? '????'}</td>
              </tr>
            )
          }
          </tbody>
        </Table>
      </div>
    </div>
  )
}
