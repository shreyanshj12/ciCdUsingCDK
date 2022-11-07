export class Env {
  account: string;
  region: string;

  constructor(accountId: string, region: string) {
    this.account = accountId;
    this.region = region;
  }
}
