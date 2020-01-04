function await1() {
    return new Promise(resolve=> {
        setTimeout(() => {
            resolve("异步")
        },3000)
    })
}

async function test() {
    const v = await await1()
    console.log(v)
}

test()