const {responseComment, sendComment} = require('../../../services/nodeMailer')

const postContactUsController = async(data) =>{
    await sendComment(data);
    console.log("ok")
    await responseComment(data)
    return data
}

module.exports = postContactUsController