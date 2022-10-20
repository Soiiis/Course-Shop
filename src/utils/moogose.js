module.exports = {
    mutipleMoongooseToObject : function (moogoose) {
        return moogoose.map(moogoose => moogoose.toObject());
    },
    moogooseToObject : function (moogoose) {
        return moogoose ? moogoose.toObject() : moogoose

    }
}