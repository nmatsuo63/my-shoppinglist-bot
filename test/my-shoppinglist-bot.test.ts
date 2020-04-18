import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import MyShoppinglistBot = require('../lib/my-shoppinglist-bot-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new MyShoppinglistBot.MyShoppinglistBotStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
