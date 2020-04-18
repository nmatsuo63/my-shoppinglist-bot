import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb'
import * as lambda  from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';

export class MyShoppinglistBotStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, 'Table', {
      partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING }
    })

    const lineShoppingLambda = new lambda.Function(this, 'LineShoppingLambda', {
      code: lambda.Code.asset('src'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_10_X,
      timeout: cdk.Duration.seconds(5),
      environment: {
        ACCESS_TOKEN: process.env.ACCESS_TOKEN!,
        CHANNEL_SECRET: process.env.CHANNEL_SECRET!,
        TABLE_NAME: table.tableName,
      }
    });

    const api = new apigateway.RestApi(this, 'LineShoppingApi', {
      restApiName: 'line-shopping'
    });

    const lambdaIntegration = new apigateway.LambdaIntegration(
      lineShoppingLambda, { proxy: true } );

    api.root.addMethod('POST', lambdaIntegration)

    table.grantFullAccess(lineShoppingLambda)
  }
}