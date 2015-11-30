export default [{
  id: '10001',
  text: '講屁話，有什麼問題嗎？',
  items: [{
    text: '這是哪？',
    dialogue: '10002'
  }, {
    text: '你是誰？',
    dialogue: '10003'
  }, {
    text: '沒事',
    dialogue: '10004'
  }]
}, {
  id: '10002',
  text: '這裡是⋯⋯屁話，還有其它問題嗎？',
  items: [{
    text: '你是誰？',
    dialogue: '10003'
  }, {
    text: '沒事',
    dialogue: '10004'
  }]
}, {
  id: '10003',
  text: '我是⋯⋯這是我的名片',
  pushState: '/user/amowu'
}, {
  id: '10004',
  text: '再會'
}]
