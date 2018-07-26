import API from './api';
import { getAllCookies } from './cookies';

export default {
  create(photos) {
    const eventListeners = {};
    const cookies = getAllCookies();
    const photosToUpload = photos.filter(photo => photo.image instanceof File);
    const totalBytesToUpload = photosToUpload.reduce((sum, photo) => sum + photo.image.size, 0);

    function emit(eventName, value) {
      eventListeners[eventName].forEach(listener => listener(value));
    }

    return {
      async upload() {
        const readyPhotos = [];
        let photosUploaded = 0;
        let bytesUploaded = 0;

        emit('progress', {
          percent: 0,
          uploaded: 0,
          total: photosToUpload.length,
        });

        return photos.reduce((promise, photo) => promise.then(() => {
          if (photosToUpload.includes(photo)) {
            return API.upload(photo.image, cookies)
              .then(([image]) => API.photos.create({ image: image.id }, cookies))
              .then(uploadedPhoto => ({ photo: uploadedPhoto, bytesUploaded: photo.image.size }));
          }

          return { photo };
        })
          .then((result) => {
            readyPhotos.push(result.photo);

            if (result.bytesUploaded) {
              bytesUploaded += result.bytesUploaded;
              photosUploaded += 1;
            }

            emit('progress', {
              percent: (bytesUploaded / totalBytesToUpload) * 100,
              uploaded: photosUploaded,
              total: photosToUpload.length,
            });
          }), Promise.resolve())
          .then(() => {
            emit('end');

            return readyPhotos;
          });
      },

      on(eventName, listener) {
        eventListeners[eventName] = eventListeners[eventName] || [];
        eventListeners[eventName].push(listener);
      },
    };
  },
};
