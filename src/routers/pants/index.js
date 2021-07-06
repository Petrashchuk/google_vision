import KoaRouter from 'koa-router';
import fetch from "node-fetch";

const router = new KoaRouter();

router.get('/',async (ctx)=>{
    try {
        const response = await fetch('https://amazon-price1.p.rapidapi.com/search?marketplace=ES&keywords=dress', {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "cc74283b3cmsha2d48cf300f3721p1c76adjsn38941aea8e35",
                "x-rapidapi-host": "amazon-price1.p.rapidapi.com"
            }
        })
        const data = await response.json();
        console.log(data);
        ctx.body = JSON.stringify(data);
    } catch (e) {
        console.log(e);
    }
})

export default router;