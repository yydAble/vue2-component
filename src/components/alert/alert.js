import Notification from './notification'
let messageInstance
console.log(Notification)
function getMessageInstance(){
  messageInstance = messageInstance || Notification.newInstance()
  return messageInstance
}

function notice({duration=1.5,content=''}){
  let instance = getMessageInstance()
  console.log(instance)
  instance.add({
    content: content,
    duration: duration
  })
}


export default {
  info(options){
    return notice(options)
  }
}
