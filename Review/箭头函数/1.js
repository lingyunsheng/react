let obj = {
    age:20,
    info: function(){
        return ()=> {
            console.log(this.age)
        }
    }
}
let person = {age:28}
let info = obj.info()
info()

let info2 = obj.info.call(person)
info2()