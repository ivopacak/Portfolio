import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeGetterService } from './services/theme-getter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Portfolio-Webpage';

  ngClasses = {
    home: {
      active: false
    },
    portfolio: {
      active: false
    },
    ich: {
      active: false
    }
  }

  currentTheme = ''

  constructor(private router: Router, private themeGetter: ThemeGetterService) {

  }

  async ngOnInit() {

    this.listenToThemeChange()

    await this.sleep(10)

    switch (this.router.url) {
      case '/':
        this.router.navigate(['/home'])
        this.configHome()
        break
      case '/home':
        this.router.navigate(['/home'])
        this.configHome()
        break
      case '/portfolio':
        this.configPortfolio()
        break
      case '/ich':
        this.configIch()
        break
      default:
        this.deactivateActiveElements()
    }
  }

  async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  listenToThemeChange() {
    this.themeGetter.getTheme().subscribe(theme => {
      this.currentTheme = theme
    })
  }
  configHome() {
    this.deactivateActiveElements()
    this.ngClasses.home.active = true
  }

  configPortfolio() {
    this.deactivateActiveElements()
    this.ngClasses.portfolio.active = true
  }

  configIch() {
    this.deactivateActiveElements()
    this.ngClasses.ich.active = true
  }

  deactivateActiveElements(): void {
    this.ngClasses.home.active = false
    this.ngClasses.portfolio.active = false
    this.ngClasses.ich.active = false
  }

  navigateToHome() {
    this.router.navigate(['home'])
    this.configHome()
  }

  navigateToPortfolio() {
    this.router.navigate(['portfolio'])
    this.configPortfolio()
  }

  navigateToIch() {
    this.router.navigate(['ich'])
    this.configIch()
  }

  redirectToGithub() {
    window.open('https://github.com/ivopacak/Portfolio', '_blank')
  }

  settingsClicked() {
    let colors = document.querySelector('#colors') as HTMLElement
    if (colors.style.width == '150px') this.colorsHidden()
    else this.colorsVisible()
  }

  colorsVisible() {
    let colors = document.querySelector('#colors') as HTMLElement
    colors.style.width = '150px'
  }

  colorsHidden() {
    let colors = document.querySelector('#colors') as HTMLElement
    colors.style.width = '0px'
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  changeTheme(color: string) {
    this.themeGetter.setTheme(color)
    this.currentTheme = color

    // seite neu laden, damit die neue Farbe angezeigt wird
    this.reloadCurrentRoute()
    this.colorsHidden()
  }
}
