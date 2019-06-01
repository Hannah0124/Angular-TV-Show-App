import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // added automatically
import { environment } from 'src/environments/environment'; // added automatically
import { IShowResult } from '../ishow-result';
import {map} from 'rxjs/operators'; // added manually

interface IShowResultData {
  name: string,
  rating: {
    average: number
  },
  genres: string,
  premiered: string,
  status: string,
  schedule: {
    time: string
  },
  network: {
    country: {
      timezone: string
    }
    name: string
  },
  officialSite: string,
  summary: string,
  image: {
    original: string
  }
}


@Injectable({
  providedIn: 'root'
})
export class ShowService {

  constructor(private httpClient: HttpClient) { }

  getShowResult(name: string) {
    return this.httpClient.get<IShowResultData>(
      `${environment.baseUrl}api.tvmaze.com/singlesearch/shows?q=${name}&appid=${environment.appId}`
    ).pipe(map(data => this.transformtoIShowResult(data)))
  }


  private transformtoIShowResult(data: IShowResultData) : IShowResult {
    return {
      name: data.name,
      rating: data.rating.average,
      genres: data.genres, // all elements from one array.
      premiered: data.premiered,
      status: data.status,
      schedule: data.schedule.time,
      timezone: data.network.country.timezone,
      network: data.network.name,
      officialSite: data.officialSite,
      summary: data.summary,
      image: data.image.original
    }
  }
}