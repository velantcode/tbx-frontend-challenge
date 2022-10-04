import { getData } from '../AxiosService'

const pt = '/files'

export async function getFilesList () {
  const res = await getData(`${pt}/data`)
  if (res && res.success) return res.data || []
  return res
}

export async function getFileDetails (fileName) {
  const res = await getData(`${pt}/data`, { fileName })
  if (res && res.success) return res.data || null
  return res
}
