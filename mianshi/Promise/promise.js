// 定义一个Promise类
class Promise {
  constructor() {
    // 三个状态
    this.state = 'pengding'
    this.value = undefined
    this.reason = undefined
    let resolve = value => {
      if (this.state === 'pengding') {
        this.state = 'fulfilled'
        this.value = value
      }
    }
    let reject = value => {
      if (this.state === 'pengding') {
        this.state = 'rejected'
        this.reason = value
      }
    }
    try {
      fn(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    switch (this.state) {
      case 'fulfilled':
        onFulfilled()
        break;
      case 'rejected':
        onRejected()
        break;
      default:
    }
  }
}
