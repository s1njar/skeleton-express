/**
 * @interface IResultResponse
 */
export interface IResultResponse {

    /**
     * Get status.
     */
    getStatus(): number;

    /**
     * Set status.
     *
     * @param status
     */
    setStatus(status: number): IResultResponse;

    /**
     * Get message.
     */
    getMessage(): string;

    /**
     * Set message.
     *
     * @param message
     */
    setMessage(message: string): IResultResponse;

    /**
     * Get data.
     */
    getdata(): any;

    /**
     * Set data.
     *
     * @param data
     */
    setData(data: any): IResultResponse;

    /**
     * Get error.
     */
    getError(): object;

    /**
     * Set error.
     *
     * @param status
     * @param message
     * @param errors
     */
    setError(status: number, message: string, errors: object[]): IResultResponse;
}