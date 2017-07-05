import { SignIn } from './../sign-in/sign-in';
import { FrequencyIndexPage } from './../frequency-index/frequency-index';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-app-index',
  templateUrl: 'app-index.html',
})
export class AppIndexPage {
  tab1: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tab1 = FrequencyIndexPage;
  }

}
