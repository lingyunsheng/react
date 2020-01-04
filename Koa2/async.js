
function normalFunc() {
    return 'something'
}

async function async1() {
    return 'hello async'
}

async function async2() {
    // await 接收
    const v1 = await normalFunc()
    const v2 = await async1()
    console.log(v1,v2)
}

async2()

// async1 执行 返回的是一个promis对象 并不是一个单纯的字符串
// await : async await  等待  早成阻塞   await 可以接收普通值和 promise
const result = async1()
console.log(result)

// 输出结果  Promise {'Hello async'}