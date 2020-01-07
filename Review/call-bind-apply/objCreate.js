// object.create基本实现原理 原型对象
function create(obj) {
    function F() {}
    F.prototype = obj
    return new F()
}
