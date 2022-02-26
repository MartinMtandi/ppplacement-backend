import { HttpException, HttpStatus } from "@nestjs/common";
import { existsSync, mkdirSync } from "fs";
import { v4 as uuid } from 'uuid';
import { diskStorage } from "multer";
import { extname } from "path";

export const multerConfig = {
    dest: 'fileStorage'
}

function uuidRandom(file){
    return `${uuid()}${extname(file.originalname)}`;
}

export const multerOptions = {
    fileFilter: (req: any, file: any, cb: any) => {
        if(file.mimetype.match(/\/(jpg|jpeg|png|pdf|docx)$/)){
            cb(null, true)
        }else{
            cb(new HttpException(`unsupported file type ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
        }
    },
    
    storage: diskStorage({
        destination: (req: any, file: any, cb: any) => {
            const uploadPath = multerConfig.dest;

            if(!existsSync(uploadPath)) {
                mkdirSync(uploadPath);
            }

            cb(null, uploadPath);
        },

        filename: (req: any, file: any, cb: any) => {
            cb(null, uuidRandom(file));
        }
    }),

    limits: {fileSize: 1024*1024*10}
}