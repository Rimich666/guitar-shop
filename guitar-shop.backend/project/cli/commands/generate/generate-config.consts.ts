export type unionType = string|number|boolean;

export type GenerateConfig = {
  count: unionType,
  usersUri: unionType;
  uploaderUri: unionType;
  mockDataPath: unionType;
  imagesPath: unionType;
  uploadPath: unionType;
};

export type MockData = {
  names: string[];
  descriptions: string[];
  images: string[];
}

export const Parameters = {
  users: 'usersUri',
  uploader: 'uploaderUri',
  count: 'count',
  mocks: 'mockDataPath',
  images: 'imagesPath',
  upload: 'uploadPath'
};

export const DefaultConfig: GenerateConfig = {
  count: 10,
  usersUri: 'mongodb://admin:test@localhost:27017/guitar-shop-users-mongo?authSource=admin',
  uploaderUri: 'mongodb://admin:test@localhost:27017/guitar-shop-uploader?authSource=admin',
  mockDataPath: './mocks/mock-data.json',
  imagesPath: './mocks/images/',
  uploadPath: 'E:/HTML_academy/guitar-shop/guitar-shop.backend/project/apps/uploader/uploads'
};

export const DEFAULT_CONFIG_PATH = './mocks/generate.config.json';
