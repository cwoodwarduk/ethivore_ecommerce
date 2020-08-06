import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import config from '../config';

const storage = multer.diskStorage({
   destination(req, file, callback){
       callback(null, 'uploads/');
   },
   filename(req, file, callback){
       callback(null, `${Date.now()}.jpg`);
   }
});

const upload = multer({storage});

const router = express.Router();

router.post('/', upload.single('image'), (req, res) => {
   res.send(`/${req.file.path}`);
});

// CODE FOR ROUTE TO AWS S3 BUCKET: 

// aws.config.update({
//     accessKeyId: config.accessKeyId,
//     secretAccessKey: config.secretAccessKey
// });

// const s3 = new aws.S3();

// const storageS3 = multerS3({
//    s3,
//    bucket: 'ethivore-bucket',
//    acl: 'public-read',
//    contentType: multerS3.AUTO_CONTENT_TYPE,
//     key(req, file, callback){
//        callback(null, file.originalname)
//     },
// });

// const uploadS3 = multer({storage: storageS3});

// router.post('/s3', uploadS3.single('image'), (req, res) => {
//     res.send(req.file.location);
// });

export default router;