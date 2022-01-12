import express from 'express';
import image from '../controllers/myPage/profileImage';
import modifyUsername from '../controllers/myPage/username';
import { blockUnauthorized } from '../middleware/checkauth';
import { upload } from '../middleware/multer';

const myPage = express.Router();
myPage.patch('/profileImage', blockUnauthorized, upload.single('image'), image);
myPage.patch('/username', blockUnauthorized, modifyUsername);

export default myPage;
