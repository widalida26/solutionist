import express from 'express';
import image from '../controllers/myPage/profileImage';
import { blockUnauthorized } from '../middleware/checkauth';
import { upload } from '../utils/multer';

const myPage = express.Router();
myPage.patch('/profileImage', blockUnauthorized, upload.single('image'), image);

export default myPage;
