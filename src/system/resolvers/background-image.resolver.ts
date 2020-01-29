import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class BackgroundImageResolver implements Resolve<any> {
	backgroundImage: string = environment.backgroundImage;
	constructor(
		private http: HttpClient,
		private sanitizer: DomSanitizer
	) { }

	resolve = (): Observable<any> =>
		this.http.get(this.backgroundImage, { responseType: 'blob' }).pipe(
			map(image => {
				const blob: Blob = new Blob([image], { type: 'image/svg+xml' });
				const imageStyle = `url(${window.URL.createObjectURL(blob)})`;
				return this.sanitizer.bypassSecurityTrustStyle(imageStyle);
			})
		)
}