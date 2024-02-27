import {Controller, Inject, UseFilters} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {appsConfig} from '@project/configurations';
import {ConfigType} from '@nestjs/config';
import {UploadedFileRdo} from '@project/shared-dto';
import 'multer';
import {AxiosExceptionFilter} from './filters/axios-exception.filter';

@Controller('uploader')
@UseFilters(AxiosExceptionFilter)
export class FileController {
  constructor(
    private readonly httpService: HttpService,
    @Inject (appsConfig.KEY) private readonly config: ConfigType<typeof appsConfig>,
  ) {}

  public async upload(file: Express.Multer.File): Promise<UploadedFileRdo> {
    const form = new FormData();
    form.append('file', new Blob([file.buffer]), file.originalname);
    const image = await this.httpService.axiosRef.post(
      `${this.config.files}/upload`, form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
      });
    return image.data;
  }

}
