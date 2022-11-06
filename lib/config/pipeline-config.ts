export class Env {
  account: string;
  region: string;

  constructor(accountId: string, region: string) {
    this.account = accountId;
    this.region = region;
  }
}

export const ENV = new Env("483514200526", "eu-west-1");
