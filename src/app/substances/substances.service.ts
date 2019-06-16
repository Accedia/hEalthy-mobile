import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubstancesService {

  private readonly API_LINK = environment.HEALTHY_API_LINK;
  private readonly GOOGLE_CLOUD_VISION_API_LINK = environment.GOOGLE_CLOUD_VISION_API_LINK;
  private readonly GOOGLE_CLOUD_VISION_API_KEY = environment.COOGLE_CLOUD_VISION_API_KEY;
  public substanceBase64Image: string = null;

  constructor(
    private http: HttpClient
  ) {}

  public searchForSubstance(substance: string): Promise<any> {
    const httpParams: HttpParams = this.buildSearchHttpParams(substance);
    return this.http.get(`${this.API_LINK}/substance`, {
      params: httpParams
    }).toPromise();
  }

  private buildSearchHttpParams(substance: string) {
    return new HttpParams()
      .set('name', substance);
  }

  public readTextFromImage(): Promise<any> {
    const apiLink = `${this.GOOGLE_CLOUD_VISION_API_LINK}${this.GOOGLE_CLOUD_VISION_API_KEY}`;
    return this.http.post(apiLink, this.buildGoogleVisionApiRequest()).toPromise();
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

  public getSubstancesFromOcrString(ocrGeneratedText: string): Promise<any> {
    return this.http.post(`${this.API_LINK}/process`, {
      query: ocrGeneratedText
    }).toPromise();
  }

}
