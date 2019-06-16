import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { mockSubstancesData, mockGoogleVisionData } from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class SubstancesService {

  private readonly API_LINK = '';
  private readonly GOOGLE_CLOUD_VISION_API_LINK = 'https://vision.googleapis.com/v1/images:annotate?key=';
  private readonly GOOGLE_CLOUD_VISION_API_KEY = environment.COOGLE_CLOUD_VISION_API_KEY;
  public substanceBase64Image: string = null;

  constructor(
    private http: HttpClient
  ) {}

  public getListFromOcrString(str: string): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(mockSubstancesData);
      }, 1500);
    });
  }

  public readTextFromImage(): Promise<any> {
    // const apiLink = `${this.GOOGLE_CLOUD_VISION_API_LINK}${this.GOOGLE_CLOUD_VISION_API_KEY}`;
    // return this.http.post(apiLink, this.buildGoogleVisionApiRequest()).toPromise();
    return Promise.resolve(mockGoogleVisionData);
  }

  private buildGoogleVisionApiRequest() {
    return {
      requests: [
        {
          features: [
            { type: 'TEXT_DETECTION' }
          ],
          image: {
            content: this.substanceBase64Image
          }
        }
      ]
    };
  }
}
