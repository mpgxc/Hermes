export type DestinationFile = 'images' | 'templates';

export type FileUpload = {
  path: string;
  mimetype: string;
  filename: string;
};

export interface IStorageFilesProvider {
  save(destination: DestinationFile, file: FileUpload): Promise<string>;
  remove(destination: DestinationFile, file: FileUpload): Promise<void>;
}
