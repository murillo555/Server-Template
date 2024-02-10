import jwt from "jsonwebtoken"
import logger from "@logger";
//Generate Token Like a Promise
const TokenGenerator = (uid = '') => {
    return new Promise((resolve, reject) => {
        if (process.env.SECRETPRIVATEKEY) {
            const payload = { uid };
            jwt.sign(payload, process.env.SECRETPRIVATEKEY, {
                expiresIn: '4h'
            }, (err, token) => {
                if (err) {
                    logger.error('[jwt, Token Generator]', err);
                    reject('Error in Token Generator')
                } else {
                    resolve(token);
                }
            })
        } else reject('Error in Token Generator')
    })
}

export default TokenGenerator