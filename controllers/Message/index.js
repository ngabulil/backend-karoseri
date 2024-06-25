const sendMail = require("../../utils/mailer")
const { customRes } = require("../../utils/responseUtil")

const createMessage = async (req, res) => {
    try {
        const {
            nama,
            email,
            message,
            link_product,
            phone
        } = req.body
        if (!nama || !email || !link_product || !phone || !message) {
            return customRes(res, 400, 'nama, email, link_product, phone, message are required')
        }
        await sendMail(email, 'Pesan anda telah dikirim', "email_cust.html", { name: nama })
        await sendMail('ulilbinabdul@gmail.com', 'Pesan baru dari website karoseri', "email_admin.html", { name: nama, email, phone, link_product, message })
        return customRes(res, 201, 'message sent', {})
    } catch (error) {
        console.log(error);
        return customRes(res, 500, 'internal server error')
    }
}

module.exports = {
    createMessage,
}