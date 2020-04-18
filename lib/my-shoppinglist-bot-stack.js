"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/core");
const dynamodb = require("@aws-cdk/aws-dynamodb");
const lambda = require("@aws-cdk/aws-lambda");
const apigateway = require("@aws-cdk/aws-apigateway");
class MyShoppinglistBotStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const table = new dynamodb.Table(this, 'Table', {
            partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING }
        });
        const lineShoppingLambda = new lambda.Function(this, 'LineShoppingLambda', {
            code: lambda.Code.asset('src'),
            handler: 'index.handler',
            runtime: lambda.Runtime.NODEJS_10_X,
            timeout: cdk.Duration.seconds(5),
            environment: {
                ACCESS_TOKEN: process.env.ACCESS_TOKEN,
                CHANNEL_SECRET: process.env.CHANNEL_SECRET,
                TABLE_NAME: table.tableName,
            }
        });
        const api = new apigateway.RestApi(this, 'LineShoppingApi', {
            restApiName: 'line-shopping'
        });
        const lambdaIntegration = new apigateway.LambdaIntegration(lineShoppingLambda, { proxy: true });
        api.root.addMethod('POST', lambdaIntegration);
        table.grantFullAccess(lineShoppingLambda);
    }
}
exports.MyShoppinglistBotStack = MyShoppinglistBotStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktc2hvcHBpbmdsaXN0LWJvdC1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15LXNob3BwaW5nbGlzdC1ib3Qtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBcUM7QUFDckMsa0RBQWlEO0FBQ2pELDhDQUErQztBQUMvQyxzREFBc0Q7QUFFdEQsTUFBYSxzQkFBdUIsU0FBUSxHQUFHLENBQUMsS0FBSztJQUNuRCxZQUFZLEtBQW9CLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQ2xFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO1lBQzlDLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO1NBQ3RFLENBQUMsQ0FBQTtRQUVGLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxvQkFBb0IsRUFBRTtZQUN6RSxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQzlCLE9BQU8sRUFBRSxlQUFlO1lBQ3hCLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNoQyxXQUFXLEVBQUU7Z0JBQ1gsWUFBWSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBYTtnQkFDdkMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBZTtnQkFDM0MsVUFBVSxFQUFFLEtBQUssQ0FBQyxTQUFTO2FBQzVCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRTtZQUMxRCxXQUFXLEVBQUUsZUFBZTtTQUM3QixDQUFDLENBQUM7UUFFSCxNQUFNLGlCQUFpQixHQUFHLElBQUksVUFBVSxDQUFDLGlCQUFpQixDQUN4RCxrQkFBa0IsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBRSxDQUFDO1FBRXhDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsQ0FBQyxDQUFBO1FBRTdDLEtBQUssQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtJQUMzQyxDQUFDO0NBQ0Y7QUEvQkQsd0RBK0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0ICogYXMgZHluYW1vZGIgZnJvbSAnQGF3cy1jZGsvYXdzLWR5bmFtb2RiJ1xuaW1wb3J0ICogYXMgbGFtYmRhICBmcm9tICdAYXdzLWNkay9hd3MtbGFtYmRhJztcbmltcG9ydCAqIGFzIGFwaWdhdGV3YXkgZnJvbSAnQGF3cy1jZGsvYXdzLWFwaWdhdGV3YXknO1xuXG5leHBvcnQgY2xhc3MgTXlTaG9wcGluZ2xpc3RCb3RTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCB0YWJsZSA9IG5ldyBkeW5hbW9kYi5UYWJsZSh0aGlzLCAnVGFibGUnLCB7XG4gICAgICBwYXJ0aXRpb25LZXk6IHsgbmFtZTogJ3VzZXJJZCcsIHR5cGU6IGR5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HIH1cbiAgICB9KVxuXG4gICAgY29uc3QgbGluZVNob3BwaW5nTGFtYmRhID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCAnTGluZVNob3BwaW5nTGFtYmRhJywge1xuICAgICAgY29kZTogbGFtYmRhLkNvZGUuYXNzZXQoJ3NyYycpLFxuICAgICAgaGFuZGxlcjogJ2luZGV4LmhhbmRsZXInLFxuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEwX1gsXG4gICAgICB0aW1lb3V0OiBjZGsuRHVyYXRpb24uc2Vjb25kcyg1KSxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIEFDQ0VTU19UT0tFTjogcHJvY2Vzcy5lbnYuQUNDRVNTX1RPS0VOISxcbiAgICAgICAgQ0hBTk5FTF9TRUNSRVQ6IHByb2Nlc3MuZW52LkNIQU5ORUxfU0VDUkVUISxcbiAgICAgICAgVEFCTEVfTkFNRTogdGFibGUudGFibGVOYW1lLFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgYXBpID0gbmV3IGFwaWdhdGV3YXkuUmVzdEFwaSh0aGlzLCAnTGluZVNob3BwaW5nQXBpJywge1xuICAgICAgcmVzdEFwaU5hbWU6ICdsaW5lLXNob3BwaW5nJ1xuICAgIH0pO1xuXG4gICAgY29uc3QgbGFtYmRhSW50ZWdyYXRpb24gPSBuZXcgYXBpZ2F0ZXdheS5MYW1iZGFJbnRlZ3JhdGlvbihcbiAgICAgIGxpbmVTaG9wcGluZ0xhbWJkYSwgeyBwcm94eTogdHJ1ZSB9ICk7XG5cbiAgICBhcGkucm9vdC5hZGRNZXRob2QoJ1BPU1QnLCBsYW1iZGFJbnRlZ3JhdGlvbilcblxuICAgIHRhYmxlLmdyYW50RnVsbEFjY2VzcyhsaW5lU2hvcHBpbmdMYW1iZGEpXG4gIH1cbn0iXX0=