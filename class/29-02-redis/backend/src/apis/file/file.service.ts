import { Storage } from "@google-cloud/storage";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FileService {
    async upload({files}){
        const waitedFiles = await Promise.all(files)
        console.log(waitedFiles)

        const storage = new Storage({
            projectId: process.env.GCP_PROJECT_ID,
            keyFilename: process.env.GCP_KEY_FILE_NAME
        }).bucket(process.env.GCP_BUCKET)

        const results = await Promise.all(
          waitedFiles.map((el) => {
            return new Promise((resolve, reject) => {
              el.createReadStream()
                .pipe(storage.file(el.filename).createWriteStream())
                .on('finish', () => resolve(`${process.env.GCP_BUCKET}/${el.filename}`))
                .on('error', () => reject())
            })
          })
        )

        return results
    }
}

