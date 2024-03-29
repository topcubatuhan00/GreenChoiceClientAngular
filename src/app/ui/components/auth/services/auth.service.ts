import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../../common/services/generic-http.service';
import { Router } from '@angular/router';
import { CryptoService } from '../../../../common/services/crypto.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	apiLoginEndpoint = "Auth/Login";
	apiRegisterEndpoint = "Auth/Register";

	constructor(
		private _http: GenericHttpService,
		private _router: Router,
		private _crypto: CryptoService,
		private _toastr: ToastrService
	) { }

	login(model: any, rememberMe: boolean) {
		this._http.post<any>(this.apiLoginEndpoint, model, res => {
			if (!res.error) {
				let decoded = this._crypto.getDecodedAccessToken(res.token);
				localStorage.setItem("accessToken", res.token);
				if (rememberMe) {
					localStorage.setItem("rememberUserName", decoded.Name)
					localStorage.setItem("rememberUserPhoto", decoded.Photo)
				}
				this._toastr.success("Giriş Başarılı", "Başarılı")
				this._router.navigateByUrl("/");
				return;
			} else {
				this._toastr.error("Kullanıcı adı veya parola yanlış...", "Hata")
			}
			return;
		})
	}

	register(model: any){
		this._http.post<any>(this.apiRegisterEndpoint, model, res => {
			if (!res.error) {
				localStorage.setItem("accessToken", res.token);
				this._toastr.success("Kullanıcı Başarıyla Kaydedildi", "Başarılı")
				this._router.navigateByUrl("/");
				return;
			} else {
				this._toastr.error("Bir hata oluştu tekrar deneyin...", "Hata")
			}
			return;
		})
	}

	logOut() {
		localStorage.removeItem("accessToken");
		this._router.navigateByUrl("/");
		this._toastr.success("Çıkış Başarılı", "Başarılı")
	}
}
