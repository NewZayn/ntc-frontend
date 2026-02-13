import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { StrapiResponse, Notice } from '../models/strapi.models';

@Injectable({
  providedIn: 'root',
})
export class StrapiService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.strapiUrl}/api`;

  getNotices(options: {
    pageSize?: number;
    sort?: string;
  } = {}): Observable<StrapiResponse<Notice[]>> {
    let params = new HttpParams()
      .set('populate[0]', 'featuredImage')
      .set('populate[1]', 'category')
      .set('sort[0]', options.sort ?? 'publishedDate:desc')
      .set('pagination[pageSize]', (options.pageSize ?? 12).toString())
      .set('status', 'published');

    return this.http.get<StrapiResponse<Notice[]>>(`${this.baseUrl}/notices`, { params });
  }

  getNoticeBySlug(slug: string): Observable<StrapiResponse<Notice[]>> {
    const params = new HttpParams()
      .set('filters[slug][$eq]', slug)
      .set('populate[0]', 'featuredImage')
      .set('populate[1]', 'category');

    return this.http.get<StrapiResponse<Notice[]>>(`${this.baseUrl}/notices`, { params });
  }

  getMediaUrl(url: string | null | undefined): string {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${environment.strapiUrl}${url}`;
  }
}
