import pluralize from 'pluralize';

import { current } from '../config';
import deserialize from '../utils/deserialize';
import request from '../utils/request';

import Article from '../models/article';
import Category from '../models/category';
import Project from '../models/project';
import Page from '../models/page';

const API_URL = current.apiURL;
const INLINE_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/svg'];

async function find({ model, query }, cookies) {
  const url = `${API_URL}/${pluralize(model.name)}`;
  const headers = cookies ? { Cookie: cookies } : {};
  const { docs, meta } = await request({ url, query, headers });

  return { docs: deserialize(docs, model.schema), meta };
}

async function findOne({ model, param, query }, cookies) {
  const url = `${API_URL}/${pluralize(model.name)}/${param}`;
  const headers = cookies ? { Cookie: cookies } : {};
  const doc = await request({ url, query, headers });

  return deserialize(doc, model.schema);
}

async function update({ model, param, body }, cookies) {
  const url = `${API_URL}/${pluralize(model.name)}/${param}`;
  const headers = cookies ? { Cookie: cookies } : {};
  const doc = await request({
    url,
    headers,
    body,
    method: 'PATCH',
  });

  return deserialize(doc, model.schema);
}

async function create({ model, body }, cookies) {
  const url = `${API_URL}/${pluralize(model.name)}`;
  const headers = cookies ? { Cookie: cookies } : {};
  const doc = await request({
    url,
    headers,
    body,
    method: 'POST',
  });

  return deserialize(doc, model.schema);
}

async function remove({ model, param }, cookies) {
  const url = `${API_URL}/${pluralize(model.name)}/${param}`;
  const headers = cookies ? { Cookie: cookies } : {};

  await request({
    url,
    headers,
    method: 'DELETE',
  });

  return true;
}

async function search(query, cookies) {
  const url = `${API_URL}/search`;
  const headers = cookies ? { Cookie: cookies } : {};
  const { docs, meta } = await request({ url, query, headers });

  const modelsBySearchResultType = {
    article: Article,
    page: Page,
    project: Project,
    category: Category,
  };

  const deserialized = docs.map((doc) => {
    const searchResultModel = modelsBySearchResultType[doc.searchResultType];

    return deserialize(doc, searchResultModel.schema);
  });

  return { docs: deserialized, meta };
}

async function upload(files, cookies) {
  const filesArray = Array.isArray(files) ? files : [files];

  const images = filesArray.filter(file => INLINE_IMAGE_TYPES.includes(file.type));
  const restFiles = filesArray.filter(file => !images.includes(file));

  const imagesFormData = new FormData();
  images.forEach(image => imagesFormData.append('image', image));

  const restFilesFormData = new FormData();
  restFiles.forEach(file => restFilesFormData.append('file', file));

  const headers = { Cookie: cookies };

  const uploadImages = !images.length
    ? Promise.resolve([])
    : request({
      url: `${API_URL}/images`,
      headers,
      body: imagesFormData,
      method: 'POST',
      formData: true,
    });

  const uploadRestFiles = !restFiles.length
    ? Promise.resolve([])
    : request({
      url: `${API_URL}/files`,
      headers,
      body: restFilesFormData,
      method: 'POST',
      formData: true,
    });

  return Promise.all([
    uploadImages,
    uploadRestFiles,
  ])
    .then(([uploadedImages, uploadedFiles]) => [...uploadedImages, ...uploadedFiles]);
}

const articles = {
  find: (query, cookies) => find({ model: Article, query }, cookies),
  findOne: (path, query, cookies) => findOne({ model: Article, param: path, query }, cookies),
  update: (path, body, cookies) => update({ model: Article, param: path, body }, cookies),
  create: (body, cookies) => create({ model: Article, body }, cookies),
  remove: (path, cookies) => remove({ model: Article, param: path }, cookies),
};

const pages = {
  find: cookies => find({ model: Page }, cookies),
  findOne: (path, query, cookies) => findOne({ model: Page, param: path, query }, cookies),
  update: (path, body, cookies) => update({ model: Page, param: path, body }, cookies),
  create: (body, cookies) => create({ model: Page, body }, cookies),
  remove: (path, cookies) => remove({ model: Page, param: path }, cookies),
};

const projects = {
  find: (query, cookies) => find({ model: Project, query }, cookies),
  findOne: (path, query, cookies) => findOne({ model: Project, param: path, query }, cookies),
  update: (path, body, cookies) => update({ model: Project, param: path, body }, cookies),
  create: (body, cookies) => create({ model: Project, body }, cookies),
  remove: (path, cookies) => remove({ model: Project, param: path }, cookies),
};

const categories = {
  find: (query, cookies) => find({ model: Category, query }, cookies),
  findOne: (path, query, cookies) => findOne({ model: Category, param: path, query }, cookies),
  update: (path, body, cookies) => update({ model: Category, param: path, body }, cookies),
  create: (body, cookies) => create({ model: Category, body }, cookies),
  remove: (path, cookies) => remove({ model: Category, param: path }, cookies),
};

const tags = {
  getAll: () => {
    const url = `${API_URL}/tags`;
    return request({ url });
  },
  getCloud: () => {
    const url = `${API_URL}/tags/cloud`;
    return request({ url });
  },
};

const API = {
  articles,
  pages,
  projects,
  categories,
  search,
  tags,
  upload,
};

export default API;
