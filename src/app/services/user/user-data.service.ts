import { Injectable } from "@angular/core";
import { AuthService } from "../../services/user/auth.service";

@Injectable({
  providedIn: "root"
})
export class UserDataService {
  constructor(private afAuth: AuthService) {}
}
