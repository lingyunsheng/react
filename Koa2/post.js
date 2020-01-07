const Koa  = require('koa')
const bodyparser = require('koa-bodyparser')

const app = new Koa()

app.use(bodyparser())

app.use(async(ctx)=>{
    if(ctx.url==='/' && ctx.method==='GET'){
        //显示表单页面
        let html=`
            <h1>JSPang Koa2 request POST</h1>
            <form method="POST" action="/">
                <p>userName</p>
                <input name="userName" /><br/>
                <p>age</p>
                <input name="age" /><br/>
                <p>website</p>
                <input name="webSite" /><br/>
                <button type="submit">submit</button>
            </form>
        `;
        ctx.body=html;
    }else if(ctx.url==='/' && ctx.method==='POST'){
        let pastData=ctx.request.body
         ctx.body=pastData
    }else{
        ctx.body='<h1>404!</h1>'
    }

});

// function parsePostData(ctx){
//     return new Promise((resolve,reject)=>{
//         try{
//             let postdata="";
//             ctx.req.on('data',(data)=>{
//                 postdata += data
//             })
//             ctx.req.addListener("end",function(){
//                 let parseData = parseQueryStr( postdata )
//                 resolve(parseData);
//             })
//         }catch(error){
//             reject(error);
//         }
//     });
// }


// function parseQueryStr(queryStr){
//     let queryData={};
//     let queryStrList = queryStr.split('&');
//     console.log('queryStrList',queryStrList);
//     console.log('queryStrList.entries() ',queryStrList.entries() );
//     for( let [index,queryStr] of queryStrList.entries() ){
//         let itemList = queryStr.split('=');
//         console.log('itemList',itemList);
//         queryData[itemList[0]] = decodeURIComponent(itemList[1]);
//     } 
//     return queryData
// }

app.listen(3000,()=>{
    console.log('[demo] server is starting at port 3000');
});