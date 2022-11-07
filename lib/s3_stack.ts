import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { Env } from "./config/pipeline-config";

export interface lambdaStackResources {
  readonly bucketOutput: CfnOutput;
}

export interface StorageStackProps extends StackProps {
  readonly env: Env;
  readonly stage: string;
}

export class StorageStack extends Stack {
  public readonly bucket: Bucket;
  public readonly lambdaResources: lambdaStackResources;

  constructor(scope: Construct, id: string, props: StorageStackProps) {
    super(scope, id, props);

    this.bucket = new Bucket(this, `ExportedBucket-${props.stage}`);
    this.lambdaResources = {
      bucketOutput: new CfnOutput(this, "bucketARN", {
        value: this.bucket.bucketArn,
      }),
    };
  }
}
