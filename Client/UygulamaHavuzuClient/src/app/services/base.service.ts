import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BaseService {
    public baseUrl = 'http://localhost:5281/api';

    constructor(
        public http: HttpClient
    ) {
    }

    getReq(url: any) {
        const reqUrl = this.baseUrl + url
        return this.http.get<any>(this.baseUrlUpdate(reqUrl), {
            headers: new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': this.baseUrlUpdate(reqUrl)
            }),
        });
    }


    postReq(url: any, data: any) {
        return this.http.post<any>(this.baseUrlUpdate(url), data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': this.baseUrlUpdate(url)
            }),
        });
    }

    putReq(url: any, data: any) {
        return this.http.put<any>(this.baseUrlUpdate(url), data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': this.baseUrlUpdate(url)
            }),
        });
    }


    baseUrlUpdate(url: string): string {
        return (url.startsWith('/')) ? this.baseUrl + url : url;
    }
    
}