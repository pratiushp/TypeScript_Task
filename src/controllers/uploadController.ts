import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { Upload } from '../Entities/Upload';
import { User } from '../Entities/User';
import { uploadDirectory } from '../utils/fs';
import formidable from "formidable";

export const uploadImageController = async (req: any, res: Response, next: NextFunction) => {
    try {
      

        const picture = req.headers['content-type']?.startsWith('multipart/form-data')
    if (!picture) {
      return res.status(400).json({ message: 'Invalid content type' });
    }

    const userId = req.user?.id.toString();
    const user = await User.findOne({where: {id:userId}});

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

      // const userDirectory = path.join(__dirname, userId);

      // if (!fs.existsSync(userDirectory)) {
      //   fs.mkdirSync(userDirectory)
        
      // }

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const fileExtension = ".png"
      const fileName = `${uniqueSuffix}${fileExtension}`;
      const filePath = path.join(uploadDirectory,   fileName);
      fs.writeFileSync(filePath, fileName);

    
      const uploadRepository = Upload;

      // Create a new Upload entity
      const newUpload = new Upload();
      newUpload.picturePath = filePath;
      console.log(filePath)
      newUpload.user = user;

      // Save the upload entity
      await uploadRepository.save(newUpload);

      return res.status(201).json({ message: 'Picture uploaded and saved successfully' });
    ;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred' });
  }
};



export const taskFileController =async (req:any, res:Response, next:NextFunction) => {
  try {
    const file = req.headers['content-type']?.startsWith('multipart/form-data');
    if (!file) {
      return res.status(400).send("Bad Request");
    }

    const userId = req.user?.id;

    const user = await User.findOne({where:{id: userId}})

    if (!user) {
      return res.status(400).send("Bad Request");
    }




  } catch (error) {
    
  }
}