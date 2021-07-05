import KoaRouter from 'koa-router';
import fetch from "node-fetch";

const router = new KoaRouter();

router.get('/',async (ctx)=>{
   const response = await fetch("https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail?lang=en&productcode=0839915011&country=asia2", {
       "method": "GET",
       "headers": {
           "x-rapidapi-key": "cc74283b3cmsha2d48cf300f3721p1c76adjsn38941aea8e35",
           "x-rapidapi-host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com"
       }
   })
    const data = await response.json();
    console.log(data);
   ctx.body = JSON.stringify(data);
})

export default router;