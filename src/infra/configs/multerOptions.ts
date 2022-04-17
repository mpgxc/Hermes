import { UnsupportedMediaTypeException } from '@nestjs/common';

import * as multer from 'multer';
import * as crypto from 'node:crypto';
import * as path from 'node:path';

const ACCEPTED_TYPE_UPLOADS_FILES = 'text/html';

const multerOptions: multer.Options = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', '..', 'uploads'),

    filename: (_, file, callback) => {
      const fileHash = crypto.randomBytes(8).toString('hex');
      const fileName = `${file.originalname + fileHash}.html`;

      return callback(null, fileName);
    },
  }),

  fileFilter: (request, file, callback) => {
    if (file.mimetype === ACCEPTED_TYPE_UPLOADS_FILES) {
      callback(null, true);
    } else {
      callback(null, false);

      return callback(new UnsupportedMediaTypeException('Only html files!'));
    }

    return null;
  },

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
};

export { multerOptions };
