import Koa from 'koa';
import config from 'config';
import dotenv from 'dotenv';
import configureMongo from './src/startup/configureMongo';

import router from "./src/routers";

const app = new Koa();

dotenv.config();

const PORT = process.env.PORT || config.get('port');

(() => {
    configureMongo();

    app
        .use(router.routes())
        .use(router.allowedMethods())

})()


app.listen(PORT, () => {
    console.log('Server is started')
});

