/**
 * Created by wyf on 2016/10/25.
 */
module.exports = {
    path: '/resume',

    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../containers/Resume/Resume'))
        })
    }
};