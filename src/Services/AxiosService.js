import Axios from 'axios'
import { ENV } from '../environmets'

const urlApi = ENV.URL_API || null

const axios = Axios.create({
  baseURL: urlApi,
  withCredentials: false
})

const getErrorCatch = (error) => {
  const ret = {
    error: 'Error desconocido.',
    status: null,
    extraData: null
  }

  if (error) {
    // console.error('error', error);
    /*
     * The request was made and the server responded with a
     * status code that falls out of the range of 2xx
     */
    if (error.response) {
      if (error.response.status) ret.status = error.response.status

      if (error.response.data) {
        const { data } = error.response

        if (data) {
          if (ret.status === 401) ret.error = (data.error || error.toString())
          else if (data.errors?.length > 0) {
            ret.error = (data.errors[0].error || data.errors[0].msg || 'No se logró determinar el problema.')
          } else ret.error = data.error || error.toString()

          ret.extraData = data // if exist other data assignate;

          delete ret.extraData.error
        } else ret.error = (data.error || error.toString() || 'Error desconocido.')
      } else ret.error = error.toString() || 'Error desconocido.'
    } else ret.error = error.toString()
  }

  return ret
}

/**
 * @function getData
 * @param {String} endpoint Endpoint to request.
 * @param {Object|Null} data Optional query params (optional).
 * @return {Object} response Response data or error.
 */
export const getData = async (endpoint, data = {}) => {
  try {
    const res = await axios.get(endpoint, { params: data })
    return { success: true, data: res.data }
  } catch (e) {
    return { success: false, ...getErrorCatch(e) }
  }
}
