import {ResultResponse} from "../../src/Framework/Model/ResultResponse";
import {IResultResponse} from "../../src/Framework/Model/IResultResponse";

/**
 * Returns response.
 */
export default (data: any = null): IResultResponse => {
    let response = new ResultResponse();
    return response.setData(data);
}