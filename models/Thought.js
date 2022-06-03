const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        // attach reactions as subdocument
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

// count the reactions each time
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// create model
const Thought = model('Thought', ThoughtSchema);

// export
module.exports = Thought;