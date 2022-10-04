import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import RowEmptyTable from './RowEmptyTable'
import RowTable from './RowTable'
import { getFileDetails, getFilesList } from '../Services/ApiServices/PublicService'
import FileListSelect from './FileListSelect'
import FileModal from './FileModal'

export default function TableComponent () {
  const [files, setFiles] = useState([])
  const [file, setFile] = useState(null)
  const [fileNames, setFileNames] = useState([])
  const [loading, setLoading] = useState(false)

  const getList = async () => {
    setLoading(true)
    setFileNames([])
    setFiles([])

    const res = await getFilesList()

    if (res && !res.error) {
      setFileNames([...res?.map(r => r.file)])
      setFiles([...res])
    } else setFiles([])

    setLoading(false)
  }

  const getFileData = async (fileName) => {
    if (fileName === 'all') getList()
    else {
      const res = await getFileDetails(fileName)
      if (res && !res.error) setFile(res)
      else setFiles([])
    }
  }

  useEffect(() => {
    getList()
  }, [])

  const handleCloseModal = () => {
    setFile(null)
  }

  return (
    <>
      <div className='row'>
        <div className='col-12'>
          <FileListSelect list={fileNames} handleAction={getFileData} handleRefresh={getList} />
        </div>
        <div className='col-12 table-max-height'>
          <Table striped bordered hover responsive>
            <thead className='border-bottom'>
              <tr>
                <th className='align-middle' width='20%'>File Name</th>
                <th className='align-middle'>Text</th>
                <th className='align-middle'>Number</th>
                <th className='align-middle'>Hex</th>
              </tr>
            </thead>
            <tbody>
              {
              loading
                ? <RowEmptyTable loading />
                : <RowTable data={files} handleClick={getList} />
            }
            </tbody>
          </Table>
        </div>
      </div>

      <FileModal show={!!file} file={file} handleClose={handleCloseModal} />
    </>
  )
}
