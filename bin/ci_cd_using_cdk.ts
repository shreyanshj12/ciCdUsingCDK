#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CiCdUsingCdkStack } from "../lib/ci_cd_using_cdk-stack";
import { Env } from "../lib/config/pipeline-config";

const app = new cdk.App();
const env = new Env("483514200526", "eu-west-1");
new CiCdUsingCdkStack(app, `CICD-Pipeline-Stack`, {
  env,
});
