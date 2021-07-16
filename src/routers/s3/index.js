import KoaRouter from 'koa-router';
import fs from 'fs';

import {dirname, resolve} from 'path';
import {fileURLToPath} from 'url';
import {getImage, setImage, getList} from './helpers';

const __dirname = dirname(fileURLToPath(import.meta.url));

const filesPath = resolve(__dirname, '../../../files');
const images = fs.readdirSync(filesPath);

const router = new KoaRouter();


router.post('/', async ctx => {
    const step = 1000;
    const staticTimes = Math.floor(images.length / step);
    let count = 0;

    while (staticTimes >= count) {
        const num = staticTimes - count > 0 ? step : images.length - step * count;

        const startIndex = step * count;
        const finishIndex = step * count + num;

        await Promise.all(images.slice(startIndex,finishIndex).map(async img => setImage(img)));

        count ++
    }

    ctx.body ='set to AWS bucket'
});


router.get('/', async ctx => {

    ctx.body = await Promise.all(images.map(async img => getImage(img)));

})

export default router;