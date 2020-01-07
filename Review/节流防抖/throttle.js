function throttle(fn,wait) {
    var timeout;
    var prev=0;
    return function() {
        let context = this
        let args=arguments
        if(!timeout) {
            let timeout=setTimeout(()=> {
                timeout=null
                fn.apply(context,args)
            },wait)
        }
    }
}