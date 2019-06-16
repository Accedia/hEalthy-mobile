import { Injectable } from '@angular/core';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment';
import { ImgurUploadResponse } from './interfaces/ImgurUploadResponse';
import { ImgurUploadRequest } from './interfaces/ImgurUploadRequest';

@Injectable()
export class ImgurUpload {
  private readonly IMGUR_API_URL = 'https://api.imgur.com/3/image';
  private readonly IMGUR_API_KEY = environment.IMGUR_CLIENT_KEY;

  constructor(
    private http: HTTP
  ) {}

  public async upload(base64ImageData: string, title?: string): Promise<ImgurUploadResponse> {
    const body: ImgurUploadRequest = this.buildBody(base64ImageData, title);
    const headers = this.buildRequestHeaders();

    const response: HTTPResponse = await this.http.post(this.IMGUR_API_URL, body, headers);
    return response.data as ImgurUploadResponse;
  }

  private buildRequestHeaders() {
    return {
      Authorization: `Client-ID ${this.IMGUR_API_KEY}`,
      Accept: 'application/json'
    };
  }

  private buildBody(base64ImageData: string, title?: string): ImgurUploadRequest {
    return {
      title,
      image: base64ImageData,
      type: 'base64'
    };
  }
}
