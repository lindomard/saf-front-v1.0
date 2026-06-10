import { Observable } from 'rxjs';
import { JwtToken } from 'src/app/base/base-core/model/jwt-token';

export abstract class SignInRepository {

   abstract signIn(body: String) : Observable<JwtToken>;
}