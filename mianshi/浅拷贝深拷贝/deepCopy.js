// 对象的合并 object.assign({},{x1})
let copy1 ={x:1,y:2, z:{x:3},a:{x:4}}
let copy2 = Object.assign({}, {x:1})
copy2.x=6

// object.assign 源对象的引用
// 浅拷贝 对源对象的引用 源对象发生变化时 拷贝对象页跟着变化 浅拷贝是拷贝一层 深层次的对象级别就拷贝引用
// 深拷贝 另外申请内存 源对象更改 拷贝对象不会变化 深拷贝 拷贝多层 每一层都会拷贝出来
console.log(copy2.x)
console.log(copy2)

JSON.parse(JSON.stringify(copy1))
function deepClone(copy1) {
    // 判断对象是否时数组
    let copy = copy1 instanceof Array ? [] : {}
    for(let i in copy1) {
        if(copy1.hasOwnProperty(i)) {
            copy[i] = typeof copy1[i] === 'object' ? deepClone(copy1[i]) : copy1[i]
        }
    }
    return copy
}
let copy3 = deepClone(copy1)
console.log(copy3)