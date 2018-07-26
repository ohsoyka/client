export default {
  name: 'photo-album',
  schema: {
    title: String,
    description: String,
    path: String,
    private: Boolean,
    cover: String,
    photos: [String],
    shootAt: Date,
  },
};
