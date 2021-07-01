import KoaRouter from 'koa-router';

const router = new KoaRouter();

router.get('/',(ctx)=>{
    ctx.body='Pants'
})

export default router;