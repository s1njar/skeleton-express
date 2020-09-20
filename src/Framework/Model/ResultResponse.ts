import {IResultResponse} from "./IResultResponse";

/**
 * @class ResultResponse
 */
export class ResultResponse implements IResultResponse {
    /**
     * @type number
     * @private
     */
    private status: number
    /**
     * @type string
     * @private
     */
    private message: string
    /**
     * @type any
     * @private
     */
    private data: any
    /**
     * @type object
     * @private
     */
    private error: object

    /**
     * Get status.
     */
    getStatus(): number {
        return this.status;
    }

    /**
     * Set status.
     *
     * @param status
     */
    setStatus(status: number): IResultResponse {
        this.status = status;
        return this;
    }

    /**
     * Get message.
     */
    getMessage(): string {
        return this.message;
    }

    /**
     * Set message.
     *
     * @param message
     */
    setMessage(message: string): IResultResponse {
        return this;
    }

    /**
     * Get data.
     */
    getdata(): any {
        return this.data;
    }

    /**
     * Set data.
     *
     * @param data
     */
    setData(data: any): IResultResponse {
        this.data = data;
        return this;
    }

    /**
     * Get error.
     */
    getError(): object {
        return this.error;
    }

    /**
     * Set error.
     *
     * @param status
     * @param message
     * @param errors
     */
    setError(status: number, message: string, errors: object[] = []): IResultResponse {
        this.setStatus(status || 500);

        this.error = {
            status: status || 500,
            message: message || "Something went wrong.",
            errors: errors
        };
        return this;
    }
}