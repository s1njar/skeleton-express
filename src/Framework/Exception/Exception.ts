/**
 * @class ErrorHandler
 */
export class Exception extends Error {

    /**
     * @type number
     */
    public status: number;

    /**
     * @type string
     */
    public message: string;

    /**
     * @type object[]
     */
    public errors: object[];

    /**
     * ErrorHandler constructor.
     *
     * @param status
     * @param message
     * @param errors
     */
    constructor(status: number, message: string, errors: object[] = []) {
        super();
        this.status = status;
        this.message = message;
        this.errors = errors;
    }
}