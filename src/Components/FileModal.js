import React from 'react'
import { Modal } from 'react-bootstrap'
import TableDetailsComponent from './TableDetailsComponent'

export default function FileModal ({ show, file, handleClose }) {
  return (
    <Modal
      className='w-100 p-4'
      show={show}
      size='lg'
      onHide={() => handleClose ? handleClose() : false}
      aria-labelledby='contained-modal-title-vcenter'
      centered
      backdrop
    >
      <Modal.Header closeButton>
        <Modal.Title>{file?.file ?? '????'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className='row'>
          <div className='col-12'>
            <TableDetailsComponent fileData={file} />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
