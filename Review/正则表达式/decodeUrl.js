function parseParams(obj) {
    const paramStr = /.+\?(.+)$/.exec(url)[1];
    const paramArr = paramStr.split('&');
    let paramsObj={};
    paramArr.forEach(param=> {
        if(/=/.test(param)) {
            let [key,val]=param.split('=');
            val = decodeURIComponent(url);
            val = /^d\+$/.test(val) ? parseFloat(val) :val;
            if(paramsObj.hasOwnProperty(key)) {
                paramsObj[key]=[].concat(params[key],val);
            }else {
                paramsObj[key]=val;
            }
        }else {
            paramsObj[param]=true;
        }
    })
    return paramsObj;
}
let url='www.baidu.com/get?mm=1&&ss=2&&ww=3';
parseParams(url);

function parseToMoney(num) {
    num = parseFloat(num.toFixed(3))
    let [integer, decimal] = String.prototype.split.call(num,'.');
    integer = integer.replace(/d(?=(\d{3})+$)/g,'$&,');
    return integer + '.' +(decimal ? decimal : '');
}
let num = 1234567
parseToMoney(num)