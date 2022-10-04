import React, { useEffect, useState } from 'react'

export default function FileListSelect ({ list, handleAction, handleRefresh }) {
  const [filesNames, setFilesNames] = useState([])
  const [fileSelected, setFileSelected] = useState('all')

  useEffect(() => {
    setFilesNames([...list])
  }, [list])

  const handleChange = ({ target }) => {
    setFileSelected(target?.value || 'all')
  }

  const handleClickAction = () => {
    if (handleAction) handleAction(fileSelected)
  }

  return (
    <div className='row my-2'>
      <div className='col-4'>
        <label htmlFor='files-names'>Select a file</label>
        <div className='input-group'>
          <select name='files-names' id='files-names' className='form-control' onChange={handleChange}>
            <option value='all'>All files</option>
            {
              filesNames?.map((l, i) => (
                <option value={l} key={`item-value-${i}`}>{l}</option>
              ))
            }
          </select>
          <button className='btn btn-danger m-auto' onClick={handleClickAction} disabled={fileSelected === 'all'}>
            Load file
          </button>
          <button className='btn btn-warning m-auto' onClick={handleRefresh}>
            Refresh list
          </button>
        </div>
      </div>
    </div>
  )
}
