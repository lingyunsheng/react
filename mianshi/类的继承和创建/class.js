function Person() {
    this.name=name
    this.sex=sex
}
function Student() {}

Student.prototype.name='王勤生'
Student.prototype.sex='男'

let student = new Student()
console.log(student.name,student.sex)