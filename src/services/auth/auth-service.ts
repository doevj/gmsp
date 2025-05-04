export class AuthService {

  constructor(private readonly authRepo: AuthRepository) {
    this.authRepo = authRepo;
  }

  private processResult(res: Result<AuthSuccessRes>): Result<AuthSuccessRes> {
    if (res.ok) {
      console.log('Logged in');
    }
    else {
      console.error('Auth failed:', res.error);
    }
    return res;
  }

  public async login(username: string, password: string): Promise<Result<AuthSuccessRes>> {
    return this.authRepo.login(username, password).then(this.processResult)
  }

  public async logout(): Promise<void> {
    this.authRepo.logout();
    console.log('Logged out');
  }

  public async register(username: string, password: string): Promise<Result<AuthSuccessRes>> {
    return this.authRepo.register(username, password).then(this.processResult)
  }

  public async refresh(cookies: CookiesRecord): Promise<Result<AuthSuccessRes>> {
    return this.authRepo.refresh(cookies).then(this.processResult)
  }

  public async verifyLoggedIn(cookies: CookiesRecord) {
    return this.authRepo.verifyLoggedIn(cookies).then(this.processResult)
  }
}

interface AuthRepository {
  login(username: string, password: string): Promise<Result<AuthSuccessRes>>;
  register(username: string, password: string): Promise<Result<AuthSuccessRes>>;
  refresh(cookies: Record<string, string | undefined>): Promise<Result<AuthSuccessRes>>
  verifyLoggedIn(cookies: CookiesRecord): Promise<Result<AuthSuccessRes>>
  logout(): void;
}