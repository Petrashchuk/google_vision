import AWS from "aws-sdk";
import dotenv from "dotenv";
import fs from "fs";

import { filesPath } from '../../utils';

dotenv.config();


const bucketName = process.env.AWS_BUCKET_NAME;

const s3 = new AWS.S3({
    region: process.env.AWS_BUCKET_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY

});

export const setImage = async img => {
    try {
        const buffer = await fs.promises.readFile(`${filesPath}/${img}`);
        const uploadParams = {
            Bucket: bucketName,
            Body: buffer,
            Key: img
        }
        return await s3.upload(uploadParams).promise();
    } catch (e) {
        console.error(e);
    }
}

export const getList = async () =>{
    const params = {
        Bucket: bucketName,
        MaxKeys : 2000
    };
    return await s3.listObjects(params).promise();

}

export const getImage = async img => {
    const downloadsParams = {
        Key: img,
        Bucket: bucketName
    }
    const data = await s3.getObject(downloadsParams).promise();
    data.Body = data.Body.toString('base64');
    return data;
}