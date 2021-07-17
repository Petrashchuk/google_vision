import KoaRouter from 'koa-router';
import fs from 'fs';

import {dirname, resolve} from 'path';
import {fileURLToPath} from 'url';
import {getImage, setImage, getList} from './helpers';

const __dirname = dirname(fileURLToPath(import.meta.url));

const filesPath = resolve(__dirname, '../../../files');
const images = fs.readdirSync(filesPath);

const router = new KoaRouter();


// todo while is very hard to understand
// here's an example of recursive function I wrote for the similar task
// function recursiveFetch(fileNames, onFetch, onEnd) {
//     const currentFiles = fileNames.splice(0, 10);
//
//     if (currentFiles.length === 0) {
//         onEnd();
//         return;
//     }
//
//     Promise.all(currentFiles.map(async file => {
//         // some fetch code
//
//     })).then((results) => {
//         onFetch(results);
//         // additional timeout was needed because of the load
//         setTimeout(() => {
//             recursiveFetch(fileNames, onFetch, onEnd);
//         }, 1000);
//     }).catch(e => {
//         console.log(e)
//     })
// }
//
// recursiveFetch(urls,
//     function onChunkFetch(results) {
//         // do something
//     },
//     function onEnd () {
//         // do something
//     })

router.post('/', async ctx => {
    const step = 1000;
    const staticTimes = Math.floor(images.length / step);
    let count = 0;

    while (staticTimes >= count) {
        const num = staticTimes - count > 0 ? step : images.length - step * count;

        const startIndex = step * count;
        const finishIndex = step * count + num;

        await Promise.all(images.slice(startIndex, finishIndex).map(async img => setImage(img)));

        count++
    }

    ctx.body = 'set to AWS bucket'
});


router.get('/', async ctx => {

    ctx.body = await Promise.all(images.map(async img => getImage(img)));

})

export default router;