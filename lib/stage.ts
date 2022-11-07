import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

export enum Stage {
  DEV = "Dev",
  STG = "Staging",
  PROD = "Production",
}

export interface Group {
  readonly account: string;
  readonly region: string;
}

export interface PipelineStage {
  readonly stage: Stage;
  readonly groups: Group[];
  readonly isProd: boolean;
}

export class AppStage extends cdk.Stage {
  constructor(scope: Construct, stageName: string, props: cdk.StageProps) {
    super(scope, stageName, props);
  }
}
