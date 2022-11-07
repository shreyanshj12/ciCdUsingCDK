import * as cdk from "aws-cdk-lib";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { Env } from "./config/pipeline-config";
import { AppStage, Stage } from "./stage";

export interface CiCdUsingCdkStackProps extends cdk.StackProps {
  readonly env: Env;
  readonly stage: string;
}

export class CiCdUsingCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: CiCdUsingCdkStackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "Pipeline", {
      pipelineName: "CICD-Pipeline",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub("shreyanshj12/ciCdUsingCDK", "main"),
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
    });
  }
}
