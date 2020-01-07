var a = {

    name :1,
    
    b:function(){
    d=1
    // this.name++
    return this.name

    
    }
    
 }
 console.log(a.d)
    console.log(a.b())
    
    var c = a.b
    
    console.log(c())