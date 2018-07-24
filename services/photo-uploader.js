import API from './api';
import { getAllCookies } from './cookies';

const eventListeners = {};

export default {
  create(photos) {
    const cookies = getAllCookies();

    return {
      async upload() {
        const uploadedPhotos = [];

        return photos.reduce((promise, photo) => promise.then(() => {
          if (photo.image instanceof File) {
            return API.upload(photo.image, cookies)
              .then(([image]) => API.photos.create({ image: image.id }, cookies));
          }

          return photo;
        })
          .then((uploadedPhoto) => {
            uploadedPhotos.push(uploadedPhoto);
          }), Promise.resolve())
          .then(() => uploadedPhotos);
      },

      on(eventName, listener) {
        eventListeners[eventName] = eventListeners[eventName] || [];
        eventListeners[eventName].push(listener);
      },
    };
  },
};
