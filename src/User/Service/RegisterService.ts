import User from "../Models/User";
import {Exception} from "../../Framework/Exception/Exception";
import {IResultResponse} from "../../Framework/Model/IResultResponse";
import {Types} from "mongoose";
import argon2 from "argon2";
import getResponse from "../../../app/helper/getResponse";
import {TokenService} from "./TokenService";
import {Inject} from "typescript-ioc";

/**
 * @class RegisterService
 */
export class RegisterService {

    @Inject
    private tokenService: TokenService;

    /**
     * Registers new user.
     *
     * @param data
     */
    public async execute (data : {email: string, password: string}): Promise<IResultResponse> {
        let hash = '';

        await this.checkUserAlreadyExists(data.email);

        try {
            hash = await argon2.hash(data.password);
        } catch (err) {
            throw new Exception(500, "An error occured while hashing password.")
        }

        let user = new User({
            _id: new Types.ObjectId(),
            email: data.email,
            password: hash
        });

        return user
            .save()
            .then(user => {
                let token = this.tokenService.execute(user._id, user.email);

                return getResponse({
                    _id: user._id,
                    email: user.email,
                    token: token
                });
            })
            .catch(err => {
                throw new Exception(500, err.message)
            });
    }

    /**
     * Check if user already exists.
     *
     * @param email
     * @private
     */
    private async checkUserAlreadyExists(email: string): Promise<void> {
        return User.find({ email: email })
            .exec()
            .then(user => {
                if (user.length) {
                    throw new Exception(500, "The user with given email already exists.");
                }
            });
    }
}