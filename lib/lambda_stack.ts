import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as path from "path";
import { Stack } from "aws-cdk-lib";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { Env } from "./config/pipeline-config";
import { Bucket } from "aws-cdk-lib/aws-s3";

export interface LambdaStackProps extends cdk.StackProps {
  readonly env: Env;
  readonly stage: string;
  readonly bucket: Bucket;
}

export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props: LambdaStackProps) {
    super(scope, id, props);

    const lambdaFunction = new Function(
      this,
      `TestLambdaFunction-${props.stage}`,
      {
        runtime: Runtime.NODEJS_12_X,
        handler: "handler.handler",
        code: Code.fromAsset(path.join(__dirname, "lambda")),
        environment: { stageName: props.stage },
      }
    );

    props.bucket.grantReadWrite(lambdaFunction);
  }
}
