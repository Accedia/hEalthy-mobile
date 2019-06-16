import { Component, OnInit } from '@angular/core';
import { SubstancesService } from './substances.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast } from '@ionic-native/toast/ngx';
import { SearchType } from './SearchType';
import funFacts from '../local-data/fun-facts';

@Component({
  selector: 'substances-page',
  templateUrl: './substances.page.html',
  styleUrls: ['./substances.page.scss']
})
export class SubstancesPage {

  private loading: boolean;
  private funFact: string;
  private substances: any[]; // TODO: Add typing
  private SEARCH_TYPES = SearchType;
  private searchType: SearchType;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toast: Toast,
    private substancesService: SubstancesService
  ) {
    this.setVariables();
  }

  private setVariables() {
    this.setLoading(true);
    this.substances = [];
  }

  private setLoading(loading: boolean) {
    if (loading) {
      this.funFact = this.getRandomFact();
    }

    this.loading = loading;
  }

  private getRandomFact() {
    const max = funFacts.length - 1;
    const min = 0;
    const randomIndex = Math.floor(Math.random() * (max - min) + min);

    return funFacts[randomIndex];
  }

  async ionViewDidEnter() {
    const imageBase64 = this.route.snapshot.queryParamMap.get('imageBase64');
    const substance = this.route.snapshot.queryParamMap.get('substance');
    if (imageBase64 !== null && this.substancesService.substanceBase64Image !== null) {
      this.searchType = SearchType.OCR;
      this.getSubstancesFromImage();
    } else if (substance !== null) {
      this.searchType = SearchType.STRING;
      this.getSubstancesFromSearch(substance);
    } else {
      this.router.navigate(['/home']);
    }
  }

  ionViewDidLeave() {
    this.setVariables();
  }

  private async getSubstancesFromImage() {
    try {
      this.setLoading(true);
      const googleResponse = await this.substancesService.readTextFromImage();
      const result = googleResponse.responses[0];

      // No Result from OCR API
      if (Object.keys(result).length === 0) {
        this.setLoading(false);
        return;
      }

      // Results from OCR API
      const text = result.fullTextAnnotation.text;
      this.substances = await this.substancesService.getSubstancesFromOcrString(text);
      console.log(this.substances);
    } catch (error) {
      this.showGenericError(error);
    } finally {
      this.setLoading(false);
    }
  }

  private async getSubstancesFromSearch(substance: string) {
    try {
      this.loading = true;
      this.substances = await this.substancesService.searchForSubstance(substance);
    } catch (error) {
      this.showGenericError(error);
    } finally {
      this.loading = false;
    }
  }

  private showGenericError(error: any) {
    console.error(error);
    this.toast.show('Some error occurred.', '5000', 'bottom');
  }

}
