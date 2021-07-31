import KoaRouter from 'koa-router';
import fs from 'fs';
import vision from '@google-cloud/vision';
import {filesPath} from '../../utils';

const router = new KoaRouter();
const client = new vision.ImageAnnotatorClient({
    keyFilename: 'appKey.json'
});

router.get('/', async ctx => {

    const files = fs.readdirSync(filesPath);
    const file = files[0];
    try {
        const readFile = fs.readFileSync(`${filesPath}/${file}`);
        const request = {
            image: {content: readFile},
            features: [
         /*       {type: 'FACE_DETECTION'},
                {type: 'WEB_DETECTION'},*/
                {type: 'LABEL_DETECTION'}

            ],
        };
        const [result] = await client.annotateImage(request);
        ctx.body = result;
    } catch (e) {
        console.log('error', e);
    }

});

export default router;