import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { PlayerInfoService } from '../app/services/player-info.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerDataGuard implements CanActivate {
  constructor(
    private _playerInfoService: PlayerInfoService,
    private _router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this._playerInfoService.checkPlayerData()) {
      this._router.navigate(['/welcome']);
      return false;
    }
    return true;
  }
}
