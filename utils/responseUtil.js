const customRes = (res, status, message, data) => {
    return res.status(status).json({
        status: status,
        ...(message ? { message: message } : {}),
        ...(data ? { data: data } : {})
    })
}

module.exports = { customRes }