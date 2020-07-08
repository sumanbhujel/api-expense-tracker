const mongoose = require('mongoose');
const User = require('./User');

const SCHEMA = mongoose.Schema;

const CATEGORYSCHEMA = new SCHEMA({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true
    },
    type: {
        type: String,
        required: [true, 'Category type is required'],
        trim: true
    },
    icon: {
        type: String,
        default: "others.png"
    },
    addedBy: {
        type: String,
        default: "user"
    },
    creator: {
        type: SCHEMA.Types.ObjectId,
        ref: User
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//check if category exists already
CATEGORYSCHEMA.statics.existsAlready = async function (name, type, creator) {
    let categoryExists = await CATEGORY.findOne({ name: name, type: type, creator: creator });
    return categoryExists;
}

CATEGORYSCHEMA.methods.toJSON = function () {
    let category = this.toObject();
    delete category.addedBy;
    delete category.createdAt;
    delete category.__v;
    return category;
};

const CATEGORY = mongoose.model('category', CATEGORYSCHEMA);

module.exports = CATEGORY;