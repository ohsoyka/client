export default {
  name: 'article',
  schema: {
    title: String,
    brief: String,
    intro: String,
    projectDescriptionAsIntro: Boolean,
    body: String,
    tags: [String],
    views: Number,
    path: String,
    hidden: Boolean,
    publishedAt: Date,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
    image: String,
    category: String,
    project: String,
  },
};
