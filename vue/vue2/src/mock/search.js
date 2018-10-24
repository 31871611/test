import Mock from 'mockjs';
import qs from 'qs';


let artistData = [
  {
    "id|+1":1,
    title:'郭懋介',
    photo:'http://www.ssswh.com/attachments/2015/01/3_20150113115003133Lr.jpg',
    info:'字石卿 / 1924年生 / 中国工艺美术大师',
    detailed:'郭懋介--中国雕刻家。字石卿，1924年出生于福建省福州市，2013年5月逝世。师从林友竹，擅刻人物圆雕及浮雕、薄意，兼工篆刻、书画，以雕刻薄意而著称。',
    "time":new Date()
  }
]


export default {
  artist : config => {
    let data = null;
    try {
      data = qs.parse(config.body)
    } catch (error) {
      console.log(error)
    }
    return Mock.mock({
      code: 0,
      msg: '成功',
      "data|10":artistData
    })
  }
}
