#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ServerHostingStack } from './server-hosting-stack';
import { Config } from './config';

const app = new cdk.App();
new ServerHostingStack(app, 'ServerHostingStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
env: { account: process.env.143670579917, region: process.env.region: us-east-2 },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
env: { account: Config.account, region: Config.region},

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});
export const Config = {
     // compulsory parameters

     // server hosting region
     region: 'us-east-2',
     // server hosting account
     account: '143670579917',
     // prefix for all resources in this app
     prefix: 'SatisfactoryHosting',
     // set to false if you don't want an api to
     // restart game server and true if you do
     restartApi: true,
     // Set to true if you want to use Satisfactory Experimental
     useExperimentalBuild: false,

     // optional parameters

     // bucket for storing save files
     // you can use an existing bucket
     // or leave it empty to create a new one
     bucketName: '',
     // server hosting vpc
     // Create a vpc and it's id here
     // or leave it empty to use default vpc
     vpcId: '',
     // specify server subnet
     // leave blank (preferred option) for auto-placement
     // If vpc is given specify subnet for that vpc
     // If vpc is not given specify subnet for default vpc
     subnetId: '',
     // Needed if subnetId is specified (i.e. us-west-2a)
     availabilityZone: ''
};
