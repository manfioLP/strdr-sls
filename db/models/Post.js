const mongoose = require('mongoose');
const { post } = require('../errors');

const PostSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: 'User',
    required: [true, post.USER_REQUIRED],
  },
  type: {
    type: String,
    enum: ['ROOT', 'REPOST', 'QUOTE'],
    default: 'ROOT',
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  quoteText: {},
  root: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  text: {
    type: String,
    required: [true, post.TEXT_REQUIRED],
    maxlength: [777, post.MAX_LENGTH],
    trim: true,
  },
}, { timestamps: true });

PostSchema.pre('validate', (next) => {
  switch (this.type) {
    case 'REPOST':
      if (this.user === this.owner) {
        this.invalidate('owner', 'cant repost own user post');
        next();
      }
      break;
    case 'QUOTE':
      if (!this.root) this.invalidate('type', 'root post cannot be empty is type is non-root', this.type);
      return next();
    default: // ROOT case
      if (this.root) this.invalidate('type', 'cannot have root post if type is of type ROOT', this.type);
      next();
  }
  return next();
});

module.exports = mongoose.model('Post', PostSchema);
