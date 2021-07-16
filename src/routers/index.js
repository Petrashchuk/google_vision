import KoaRouter from 'koa-router';
import dress from './dress';
import pants from './pants';
import fileSystem from './file-system';
import s3 from './s3';

const router = new KoaRouter();

const routers = {
    dress,
    pants,
    fileSystem,
    s3
}

Object.keys(routers).forEach(key => {
    router.use(`/${key}`, routers[key].routes(), routers[key].allowedMethods());
});




export default router;
