import KoaRouter from 'koa-router';
import fs from 'fs';
import {dirname, resolve, join} from 'path';
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const pathToImgDir = resolve(__dirname, '../../../img');

const router = new KoaRouter();

const createDir = name => {
    if (!fs.existsSync(name)) {
        fs.mkdirSync(name);
    }
}

router.get('/copy', async ctx => {

    // todo do you need to aways run this or one time?
    // perhaps reuse path to files folder to be consistent with resolve(__dirname, `../../../files/${folderIndex}.${index}--${img}`)
    createDir('files');
    const folderList = await fs.promises.readdir(pathToImgDir, {encoding: 'utf8'});

    await Promise.all(folderList.map(async (folder, folderIndex) => {
        const pathToFolder = join(pathToImgDir, `/${folder}`);
        const images = await fs.promises.readdir(pathToFolder);

        // todo what is the purpose of upper level Promise.all if you don't return promise in map
        // perhaps return Promise.all(images.map(async (img, index) => { ??
        await Promise.all(images.map(async (img, index) => {
            try {
                const src = `${pathToFolder}/${img}`
                const dest = resolve(__dirname, `../../../files/${folderIndex}.${index}--${img}`)
                return fs.promises.copyFile(src, dest);
            } catch (e) {
                console.error(e);
            }
        }));
    }))

    ctx.body = 'finished process copy files'

});

export default router;