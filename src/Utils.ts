import { StringMap } from "./Types";

export default class Utils {
    /**
     * Builds query parameters as string
     * @param query The query parameters to build
     * @returns A querystring for a URL
     */
    public static buildQuery(query: StringMap): string {
        let _query: string = "";
        const queryParams: string[] = Object.keys(query);

        queryParams.forEach((k, i) => {
            _query += `${k}=${query[k]}`;

            if(i < queryParams.length) _query += "&";
        });

        return _query;
    }

    /**
     * Build a new uri with the base url, the api path and the querystring if applicable
     * @param apiPath 
     * @param query 
     * @returns The formatted uri
     */
    public static buildUri(baseUrl: string, apiPath: string, query?: StringMap) {
        // query params init
        let _query: string = "";
        if (query) _query = Utils.buildQuery(query);

        if(baseUrl) return `${baseUrl}/${apiPath}?${_query}`;
        else return `${apiPath}?${_query}`;
    }
}