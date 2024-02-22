import mongoose from 'mongoose';

const LinkSchema = new mongoose.Schema(
  {
    original_link: {
      type: String,
      required: true
    },
    generated_link: {
      type: String,
      required: true
    },
    num_of_clicks: {
      type: Number,
      default: 0
    },  
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    versionKey: '__v',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

const Link = mongoose.model('Link', LinkSchema);

export default Link;
