const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^.+@.+\..+$/
        },
        // show a user's thoughts
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        // also show their friends
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

// count their friend list
UserSchema.virtual('friendCoutn').get(function () {
    return this.friends.length;
})

// create model using schema
const User = model('User', UserSchema);

// export user model
module.exports = User;