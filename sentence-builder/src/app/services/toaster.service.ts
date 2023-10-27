import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  showError(arg0: string) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
