function info() {
    console.log(this)
    console.log(this.age)
}
var person = {
    age:20,
    info
}
var age = 28;
var info = person.info;
info.call(person);
info.apply(person);
info.bind(person)();
info.call(null);
