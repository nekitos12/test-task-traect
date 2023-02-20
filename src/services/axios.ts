import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://test.tspb.su/test-task',
})
export default axiosInstance