import { Injectable } from '@angular/core';
import { APPService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private stashEndpoint: string = 'api/public-stash-tabs';

  constructor(private service: APPService) { }

  getItems(id?: string){

    if(id){
      return this.service.get(`${this.stashEndpoint}?${id}`);
    }else{
      return this.service.get(`${this.stashEndpoint}`);

    }
  }
}
