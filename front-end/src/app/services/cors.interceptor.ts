import {
    HttpInterceptor, HttpSentEvent, HttpHeaderResponse,
    HttpProgressEvent, HttpUserEvent,
    HttpRequest, HttpResponse, HttpHandler, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

export class CorsInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        const header = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
        const modifiedRequest = req.clone({headers: header});

        return next.handle(modifiedRequest);
    }
}