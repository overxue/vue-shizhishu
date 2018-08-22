// 判断当前环境是development还是production
const debug = process.env.NODE_ENV !== 'production'
export const http = debug ? 'http://shizhishu.test' : 'https://www.overxue.com'
