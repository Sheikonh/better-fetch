import Fetch from '../src/Fetch';
import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

describe('testing Fetch class', () => {
    test('get request should return a code 200', () => {
        let _fetch = new Fetch("https://dummyjson.com");

        _fetch.get<any>('/products', undefined, {"Content-Type": 'application/json'}).then(r => {
            expect(r.code).toBe(200);
        }).catch(e => {

        });
    });

    test('get request should return a code different than 200 if it errors', () => {
        let _fetch = new Fetch("https://dummyjson.com");

        _fetch.get<any>('/productss', undefined, {"Content-Type": 'application/json'}).then(r => {

        }).catch(e => {
            expect(e.code).not.toBe(200);
        });
    });
})