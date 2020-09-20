import jwt from "jsonwebtoken";
import application from "../../../app/config/application";

/**
 * @class TokenService
 */
export class TokenService {

    /**
     * Creates token with payload and returns jwt token.
     *
     * @param id
     * @param email
     */
    public execute(id: string, email: string) {
        let payload = {
            id: id,
            email: email
        };

        return jwt.sign(
            payload,
            application.tokenSecret,
            {
                expiresIn: parseInt(String(application.tokenDuration))
            }
        );
    }
}