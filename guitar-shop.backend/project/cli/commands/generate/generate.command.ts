import { PrismaClient } from '@prisma/client';
import {CliCommandInterface} from '../../cli-command.interface';
import {parseParameters} from './generate-command.helpers';
import {copyFile, readFile} from 'node:fs/promises';
import {MockData} from './generate-config.consts';
import * as fs from 'fs';
import * as mongoose from 'mongoose';
import {ensureDir} from 'fs-extra';
import ProductGenerator from './mock-data-rows-generator/product-generator';
import crypto from 'node:crypto';
import dayjs from 'dayjs';
import {FileInterface, UserType} from '../../../libs/shared/shared-types/src';
import {model, Schema} from 'mongoose';
import {genSalt, hash} from 'bcrypt';
import {SALT_ROUNDS} from '../../../libs/shared/shared-constants/src';

const admin: UserType = {
  name: 'admin',
  password: 'admin',
  email: 'admin@admin.admin'
}

const userSchema = new Schema<UserType>({
  name: String,
  password: String,
  email: String
});

const fileSchema = new Schema<FileInterface>({
  hashName: { type: String, required: true },
  originalName: { type: String, required: true },
  path: String,
  size: Number,
  mimetype: String
});

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private mockData: MockData = null as unknown as MockData;
  public async execute(...parameters:string[]): Promise<void> {
    const params = await parseParameters(parameters);
    const {
      count,
      usersUri,
      uploaderUri,
      mockDataPath,
      imagesPath,
      uploadPath
    } = params;
    try {
      await mongoose.connect(uploaderUri as string);
    } catch (error) {
      console.error(`Failed to connect to the uploader database`);
    }

    try {
      this.mockData = {...JSON.parse(await readFile(mockDataPath as string, { encoding: 'utf8' })).api};
    } catch {
      console.log(`Can't read data file from path ${mockDataPath}.`);
      return;
    }
    const prisma = new PrismaClient();
    this.mockData.images = fs.readdirSync(imagesPath as string);
    const FileModel = model<FileInterface>('files', fileSchema);
    const productGenerator = new ProductGenerator(this.mockData);
    for (let i = 1; i <= (count as number); i++) {
      const product = productGenerator.generate();
      const fileName = product.idPhoto;
      const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
      const [ year, month , day] = dayjs().format('YYYY MM DD').split(' ');
      const subDirectory = `${year}/${month}/${day}`;
      const uuid = crypto.randomUUID();
      const hashName = `${uuid}.${fileExtension}`;
      const destinationFile = `${uploadPath}/${subDirectory}/${hashName}`;
      await ensureDir(`${uploadPath}/${subDirectory}`);
      await copyFile(`${imagesPath}/${fileName}`, destinationFile);

      const file = new FileModel({
        hashName: hashName,
        originalName: fileName,
        path: `/${subDirectory}/${hashName}`,
        size: fs.statSync(`${imagesPath}/${fileName}`).size,
        mimetype: fileExtension,
      });
      const fileRecord = await file.save();
      product.idPhoto = fileRecord.id;
      const productRecord = await prisma.products.create({
        data: {
        ...product,
        }
      });
      console.log(`${productRecord.id}  ${productRecord.name} ${productRecord.price}`);
    }
    await mongoose.disconnect();

    try {
      await mongoose.connect(usersUri as string);
    } catch (error) {
      console.error(`Failed to connect to the users database`);
    }

    const UserModel = model<UserType>('users', userSchema);

    const salt = await genSalt(SALT_ROUNDS);
    const hashPassword = await hash(admin.password as string, salt);
    const foundAdmin = await UserModel.findOne({name: admin.name, email: admin.email}).exec();
    if (!foundAdmin) {
      const user = new UserModel({
      ...admin, password: hashPassword
      });
      await user.save();
    }
    await mongoose.disconnect();
    console.log(`Data was created successful!`);
  }
}
