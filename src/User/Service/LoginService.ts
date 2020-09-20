import User from "../Models/User";
import argon2 from "argon2";
import {Exception} from "../../Framework/Exception/Exception";
import getResponse from "../../../app/helper/getResponse";
import {IResultResponse} from "../../Framework/Model/IResultResponse";
import {TokenService} from "./TokenService";
import {Inject} from "typescript-ioc";

/**
 * @class LoginService
 */
export class LoginService {

    @Inject
    private tokenService: TokenService

    /**
     * User login and creating auth token.
     *
     * @param data
     */
    public async execute(
        data: {
            email: string,
            password: string
        }
    ): Promise<IResultResponse> {
        let user = await User
            .findOne({email: data.email})
            .select("email password");

        if (!user) {
            throw new Exception(401, "Auth failed.");
        }

        let verify = await argon2.verify(user.password, data.password);

        if (!verify) {
            throw new Exception(401, "Auth failed.");
        }

        let token = this.tokenService.execute(user._id, user.email);

        return getResponse({
            _id: user._id,
            email: user.email,
            token: token
        });
    }
}