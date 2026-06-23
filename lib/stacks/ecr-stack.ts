import * as cdk from 'aws-cdk-lib/core';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { Construct } from 'constructs/lib/construct';

export class EcrStack extends cdk.Stack {


    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        // The code that defines your stack goes here
        const repository = new ecr.Repository(this, 'MyEcrRepositoryApp', {
            repositoryName: 'resilience-example-repository',    
            removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
            imageScanOnPush: true,
            imageTagMutability: ecr.TagMutability.IMMUTABLE
        });
         // Add a lifecycle rule to automatically clean up old untagged images
    repository.addLifecycleRule({
      tagStatus: ecr.TagStatus.UNTAGGED,
      maxImageCount: 5,
      description: 'Keep only 5 untagged images to save storage costs',
    });

    }

}
}   