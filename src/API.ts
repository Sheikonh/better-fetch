import { StringMap } from "./Types";
import Utils from "./Utils";

export default class Fetch {
    // class variables
    private _baseUrl: string;
    private _credentials: RequestCredentials | undefined;

    /**
     * Instance a new object from the class Fetch
     * @param baseUrl The base API url. This base url will be used at every request performed with the instance
     * @param credentials The credentials of the API
     */
    constructor(baseUrl: string = "", credentials?: RequestCredentials) {
        this._baseUrl = baseUrl;
        this._credentials = credentials;
    }

    //#region public functions
    /**
     * Performs a GET request
     * @param apiPath The path to the API endpoint. If a base url not been provided, a full path url to the endpoint is required
     * @param query The request query parameters
     * @param headers The request headers
     * @returns The API response cast to the Type provided
     */
    public async get<T>(apiPath: string, query?: StringMap, headers?: HeadersInit): Promise<T> {
        // variables
        let result: T;

        try {
            const uri = Utils.buildUri(this._baseUrl, apiPath, query);
            const response = await fetch(uri, {
                headers,
                method: 'GET',
                credentials: this._credentials
            });

            result = await response.json() as T;
        } catch (ex) {
            console.error(ex);
            throw ex;
        }

        return result;
    }

    /**
     * Performs a POST request
     * @param apiPath The path to the API endpoint. If a base url not been provided, a full path url to the endpoint is required
     * @param body The body of the request. It can be formatted as any type of body
     * @param contentType The content type of the body. It must specify the correct formatting for the body
     * @param headers The headers of the request
     * @returns 
     */
    public async post<T>(apiPath: string, body: any, contentType: string, headers?: HeadersInit): Promise<T> {
        // variables
        let result: T;

        try {
            const uri = Utils.buildUri(this._baseUrl, apiPath);
            const response = await fetch(uri, {
                headers: {
                    ...headers,
                    "content-type": contentType
                },
                body,
                credentials: this._credentials,
                method: 'POST',
            });

            result = await response.json() as T;
        } catch (ex) {
            console.error(ex);
            throw ex;
        }

        return result;
    }
    //#endregion
}