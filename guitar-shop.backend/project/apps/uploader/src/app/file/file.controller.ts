import {Controller, Get, Inject, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {appConfig, uploaderConfig} from '@project/configurations';
import {FileService} from './file.service';
import 'multer';
import {ConfigType} from '@nestjs/config';
import {FileInterceptor} from '@nestjs/platform-express';
import {fillObject} from '@project/util-core';
import {UploadedFileRdo} from '@project/shared-dto';

@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    @Inject(uploaderConfig.KEY)
    private readonly uploadConfig: ConfigType<typeof uploaderConfig>,
    @Inject(appConfig.KEY)
    private readonly applicationConfig: ConfigType<typeof appConfig>,
  ) {}

  path = (file: string) =>
    `http://${this.uploadConfig.host}:${this.applicationConfig.port}${this.uploadConfig.serveRoot}${file}`;

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const newFile = await this.fileService.saveFile(file);
    const path = `${this.path(newFile.path)}`;
    return fillObject(UploadedFileRdo, Object.assign(newFile, { path }));
  }

  @Get(':fileId')
  public async show(@Param('fileId') fileId: string) {
    const existFile = await this.fileService.getFile(fileId);
    const path = `${this.path(existFile.path)}`;
    return fillObject(UploadedFileRdo, Object.assign(existFile, { path }));
  }


}
