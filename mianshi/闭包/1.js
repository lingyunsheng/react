let a=10;
let obj ={
    a:5,
    say: function() {
        console.log(this.a)
    }
}
let func = obj.say
let func2 = obj.say.bind(obj)
func()
func2()

