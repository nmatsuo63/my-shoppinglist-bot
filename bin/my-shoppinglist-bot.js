#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const cdk = require("@aws-cdk/core");
const my_shoppinglist_bot_stack_1 = require("../lib/my-shoppinglist-bot-stack");
const app = new cdk.App();
new my_shoppinglist_bot_stack_1.MyShoppinglistBotStack(app, 'MyShoppinglistBotStack');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktc2hvcHBpbmdsaXN0LWJvdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15LXNob3BwaW5nbGlzdC1ib3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsdUNBQXFDO0FBQ3JDLHFDQUFxQztBQUNyQyxnRkFBMEU7QUFFMUUsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDMUIsSUFBSSxrREFBc0IsQ0FBQyxHQUFHLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcbmltcG9ydCAnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJztcbmltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCB7IE15U2hvcHBpbmdsaXN0Qm90U3RhY2sgfSBmcm9tICcuLi9saWIvbXktc2hvcHBpbmdsaXN0LWJvdC1zdGFjayc7XG5cbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG5uZXcgTXlTaG9wcGluZ2xpc3RCb3RTdGFjayhhcHAsICdNeVNob3BwaW5nbGlzdEJvdFN0YWNrJyk7XG4iXX0=