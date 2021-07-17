import KoaRouter from 'koa-router';
import fs from 'fs';
import { join } from 'path';

import { filesPath, ImgPath } from '../../utils';

const router = new KoaRouter();

const createDir = name => {
    if (!fs.existsSync(name)) {
        fs.mkdirSync(name);
    }
}

createDir('files');

router.get('/copy', async ctx => {
    const folderList = await fs.promises.readdir(ImgPath, {encoding: 'utf8'});

    await Promise.all(folderList.map(async (folder, folderIndex) => {
        const pathToFolder = join(ImgPath, `/${folder}`);
        const images = await fs.promises.readdir(pathToFolder);

        return Promise.all(images.map(async (img, index) => {
            try {
                const src = `${pathToFolder}/${img}`
                const dest = join(filesPath, `/${folderIndex}.${index}--${img}`)
                return fs.promises.copyFile(src, dest);
            } catch (e) {
                console.error(e);
            }
        }));
    }))

    ctx.body = 'finished process copy files'

});

export default router;