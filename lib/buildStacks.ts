import { CiCdUsingCdkStack } from "./ci_cd_using_cdk-stack";
import { Env } from "./config/pipeline-config";
import * as cdk from "aws-cdk-lib";
import { Stage } from "./stage";
import { StorageStack } from "./s3_stack";
import { LambdaStack } from "./lambda_stack";

const app = new cdk.App();
const env = new Env("483514200526", "eu-west-1");

export function buildStacks() {
  const deploymentProps = {
    env: env,
    stage: Stage.DEV,
  };
  new CiCdUsingCdkStack(app, `CICD-Pipeline-Stack`, deploymentProps);
  const storageStack = new StorageStack(app, `S3-Stack`, deploymentProps);

  const lambdaStackProps = {
    env: env,
    stage: Stage.DEV,
    bucket: storageStack.bucket,
  };
  const lambdaStack = new LambdaStack(
    app,
    `Lambda-function-stack`,
    lambdaStackProps
  );
  lambdaStack.addDependency(storageStack);
  app.synth();
}
