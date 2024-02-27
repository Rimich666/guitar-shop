import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import { uploaderConfig } from '@project/configurations';
import {ConfigType} from '@nestjs/config';
import {FileRepository} from './file.repository';
import crypto from 'node:crypto';
import dayjs from 'dayjs';
import { writeFile } from 'node:fs/promises';
import {ensureDir} from 'fs-extra';
import {FileEntity} from './file.entity';
import {Extensions} from '@project/shared-constants';

type WritenFile = {
  hashName: string;
  fileExtension: string;
  subDirectory: string;
  path: string;
}

@Injectable()
export class FileService {
  constructor(
    @Inject(uploaderConfig.KEY)
    private readonly uploadConfig: ConfigType<typeof uploaderConfig>,
    private readonly fileRepository: FileRepository
  ) {}

  private async writeFile(file: Express.Multer.File): Promise<WritenFile> {
    const [ year, month , day] = dayjs().format('YYYY MM DD').split(' ');
    const { uploadDirectory } = this.uploadConfig;
    const subDirectory = `${year}/${month}/$${day}`;
    const uploadDirectoryPath = `${uploadDirectory}/${subDirectory}`;

    const uuid = crypto.randomUUID();
    const fileExtension = Extensions[file.buffer[0]];
    const hashName = `${uuid}.${fileExtension}`;
    const destinationFile = `${uploadDirectoryPath}/${hashName}`;

    await ensureDir(uploadDirectoryPath);
    await writeFile(destinationFile, file.buffer);

    return {
      hashName,
      fileExtension,
      subDirectory,
      path: `/${subDirectory}/${hashName}`,
    };
  }

  public async saveFile(file: Express.Multer.File) {
    const writenFile = await this.writeFile(file);
    const newFile = new FileEntity({
      size: file.size,
      hashName: writenFile.hashName,
      mimetype: file.mimetype,
      originalName: file.originalname,
      path: writenFile.path,
    });
    return this.fileRepository.create(newFile);
  }

  public async getFile(fileId: string) {
    const foundFile = await this.fileRepository.findById(fileId);

    if (!foundFile) {
      throw new NotFoundException(`File with ${fileId} not found.`);
    }

    return foundFile;
  }
}
