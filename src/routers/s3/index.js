import KoaRouter from 'koa-router';
import fs from 'fs';

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { getImage, setImage } from './helpers';

const __dirname = dirname(fileURLToPath(import.meta.url));

const filesPath = resolve(__dirname, '../../../files');
const images = fs.readdirSync(filesPath);

const router = new KoaRouter();


 function recursiveFetch(fileNames, onFetch, onEnd) {
     const currentFiles = fileNames.splice(0, 10);

     if (!currentFiles.length) {
         onEnd();
         return;
     }

     Promise.all(currentFiles.map(file => setImage(file)))
         .then((results) => {
         onFetch(results);
         setTimeout(() => {
             recursiveFetch(fileNames, onFetch, onEnd);
         }, 1000);
     }).catch(e => console.error(e))
 }


router.post('/', async ctx => {

    const onFetch = results => console.log('results',results);

    const onEnd = () =>console.log('End')

    recursiveFetch(images, onFetch, onEnd)

});


router.get('/', async ctx => {

    ctx.body = await Promise.all(images.map(img => getImage(img)));

})

export default router;