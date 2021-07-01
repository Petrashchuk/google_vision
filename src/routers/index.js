import KoaRouter from 'koa-router';
import dress from "./dress";
import pants from "./pants";

const router = new KoaRouter();
const routers={
    dress,
    pants
}

Object.keys(routers).forEach(key => {
    router.use(`/${key}`, routers[key].routes(), routers[key].allowedMethods())
});

export default router;
