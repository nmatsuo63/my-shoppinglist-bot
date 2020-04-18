#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { MyShoppinglistBotStack } from '../lib/my-shoppinglist-bot-stack';

const app = new cdk.App();
new MyShoppinglistBotStack(app, 'MyShoppinglistBotStack');
