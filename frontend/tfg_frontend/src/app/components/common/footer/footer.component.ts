import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  instagramLogoUrl: string | undefined;
  facebookLogoUrl: string | undefined;
  twitterLogoUrl: string | undefined;

  instagramPageUrl: string | undefined;
  facebookPageUrl: string | undefined;
  twitterPageUrl: string | undefined;

  constructor() {
    this.instagramPageUrl = "https://www.instagram.com/royaleshopoficial/";
    this.facebookPageUrl = "https://www.facebook.com/RoyaleShop-102310525744096";
    this.twitterPageUrl = "https://twitter.com/RoyaleShop_PWM";

    this.instagramLogoUrl = "https://api.iconify.design/akar-icons/instagram-fill.svg?color=%23eea10c";
    this.facebookLogoUrl = "https://api.iconify.design/eva/facebook-outline.svg?color=%23eea10c";
    this.twitterLogoUrl = "https://api.iconify.design/eva/twitter-outline.svg?color=%23eea10c";
  }

  ngOnInit() {
  }

}
