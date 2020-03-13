import {
  request
} from './request'

function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}
export {
  getHomeMultidata
}
