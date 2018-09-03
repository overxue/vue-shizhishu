import Vue from 'vue'
import Main from 'base/message/message'

let MessageConstructor = Vue.extend(Main)

let instance
let arr = ['success', 'warning', 'info', 'error']

const Message = function (options) {
  options = options || {}
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  instance = new MessageConstructor({
    data: options
  })
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true
  instance.dom = instance.vm.$el
  return instance.vm
}

arr.forEach(type => {
  Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return Message(options)
  }
})

Message.install = function (Vue, options) {
  Vue.prototype.$message = Message
}

export default Message
