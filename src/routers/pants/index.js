import KoaRouter from 'koa-router';

const router = new KoaRouter();

router.get('/',async (ctx)=>{
        ctx.body = 'pants';
})

export default router;