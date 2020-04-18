"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Line = require("@line/bot-sdk");
const line_message_builder_1 = require("line-message-builder");
const conversationModel_1 = require("./conversationModel");
const dbHandler_1 = require("./dbHandler");
const channelAccessToken = process.env.ACCESS_TOKEN;
const channelSecret = process.env.CHANNEL_SECRET;
const config = {
    channelAccessToken,
    channelSecret,
};
const client = new Line.Client(config);
async function eventHandler(event) {
    if (event.type !== 'message' || event.message.type !== 'text' || !event.source.userId) {
        return null;
    }
    const message = conversationModel_1.conversation(event.message.text);
    const replyText = [message.message];
    const shoppingList = await dbHandler_1.dbHandler(message.type, event.message.text, event.source.userId);
    if (shoppingList.length > 0) {
        shoppingList.map(value => replyText.push(value));
    }
    return client.replyMessage(event.replyToken, line_message_builder_1.buildReplyText(replyText));
}
exports.handler = async (proxyEevent, _context) => {
    console.log(JSON.stringify(proxyEevent));
    const signature = proxyEevent.headers['X-Line-Signature'];
    if (!Line.validateSignature(proxyEevent.body, channelSecret, signature)) {
        throw new Line.SignatureValidationFailed('signature validation failed', signature);
    }
    const body = JSON.parse(proxyEevent.body);
    await Promise
        .all(body.events.map(async (event) => eventHandler(event)))
        .catch(err => {
        console.error(err.Message);
        return {
            statusCode: 500,
            body: 'Error'
        };
    });
    return {
        statusCode: 200,
        body: 'OK'
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHNDQUFxQztBQUVyQywrREFBcUQ7QUFDckQsMkRBQWtEO0FBQ2xELDJDQUF1QztBQUV2QyxNQUFNLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBYSxDQUFBO0FBQ3BELE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBZSxDQUFBO0FBRWpELE1BQU0sTUFBTSxHQUFzQjtJQUM5QixrQkFBa0I7SUFDbEIsYUFBYTtDQUNoQixDQUFBO0FBQ0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBRXRDLEtBQUssVUFBVSxZQUFZLENBQUMsS0FBeUI7SUFDakQsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFNBQVMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtRQUNuRixPQUFPLElBQUksQ0FBQTtLQUNkO0lBQ0QsTUFBTSxPQUFPLEdBQUcsZ0NBQVksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBRWhELE1BQU0sU0FBUyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRW5DLE1BQU0sWUFBWSxHQUFHLE1BQU0scUJBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDM0YsSUFBSSxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUN6QixZQUFZLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0tBQ25EO0lBQ0QsT0FBTyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUscUNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBO0FBQzNFLENBQUM7QUFFWSxRQUFBLE9BQU8sR0FBa0MsS0FBSyxFQUFFLFdBQW1DLEVBQUUsUUFBUSxFQUFFLEVBQUU7SUFDMUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUE7SUFFeEMsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0lBQ3pELElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLElBQUssRUFBRSxhQUFhLEVBQUUsU0FBUyxDQUFDLEVBQUU7UUFDdEUsTUFBTSxJQUFJLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyw2QkFBNkIsRUFBRSxTQUFTLENBQUMsQ0FBQTtLQUNyRjtJQUVELE1BQU0sSUFBSSxHQUE0QixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFLLENBQUMsQ0FBQTtJQUNuRSxNQUFNLE9BQU87U0FDUixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQTJCLENBQUMsQ0FBQyxDQUFDO1NBQzlFLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNULE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQzFCLE9BQU87WUFDSCxVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxPQUFPO1NBQ2hCLENBQUE7SUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLE9BQU87UUFDSCxVQUFVLEVBQUUsR0FBRztRQUNmLElBQUksRUFBRSxJQUFJO0tBQ2IsQ0FBQTtBQUNMLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIExhbWJkYSBmcm9tICdhd3MtbGFtYmRhJ1xuaW1wb3J0ICogYXMgTGluZSBmcm9tICdAbGluZS9ib3Qtc2RrJ1xuaW1wb3J0ICogYXMgVHlwZXMgZnJvbSAnQGxpbmUvYm90LXNkay9saWIvdHlwZXMnXG5pbXBvcnQgeyBidWlsZFJlcGx5VGV4dCB9IGZyb20gJ2xpbmUtbWVzc2FnZS1idWlsZGVyJ1xuaW1wb3J0IHsgY29udmVyc2F0aW9uIH0gZnJvbSAnLi9jb252ZXJzYXRpb25Nb2RlbCdcbmltcG9ydCB7IGRiSGFuZGxlciB9IGZyb20gJy4vZGJIYW5kbGVyJ1xuXG5jb25zdCBjaGFubmVsQWNjZXNzVG9rZW4gPSBwcm9jZXNzLmVudi5BQ0NFU1NfVE9LRU4hXG5jb25zdCBjaGFubmVsU2VjcmV0ID0gcHJvY2Vzcy5lbnYuQ0hBTk5FTF9TRUNSRVQhXG5cbmNvbnN0IGNvbmZpZzogTGluZS5DbGllbnRDb25maWcgPSB7XG4gICAgY2hhbm5lbEFjY2Vzc1Rva2VuLFxuICAgIGNoYW5uZWxTZWNyZXQsXG59XG5jb25zdCBjbGllbnQgPSBuZXcgTGluZS5DbGllbnQoY29uZmlnKVxuXG5hc3luYyBmdW5jdGlvbiBldmVudEhhbmRsZXIoZXZlbnQ6IFR5cGVzLk1lc3NhZ2VFdmVudCk6IFByb21pc2U8YW55PiB7XG4gICAgaWYgKGV2ZW50LnR5cGUgIT09ICdtZXNzYWdlJyB8fCBldmVudC5tZXNzYWdlLnR5cGUgIT09ICd0ZXh0JyB8fCAhZXZlbnQuc291cmNlLnVzZXJJZCkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBjb25zdCBtZXNzYWdlID0gY29udmVyc2F0aW9uKGV2ZW50Lm1lc3NhZ2UudGV4dClcblxuICAgIGNvbnN0IHJlcGx5VGV4dCA9IFttZXNzYWdlLm1lc3NhZ2VdXG5cbiAgICBjb25zdCBzaG9wcGluZ0xpc3QgPSBhd2FpdCBkYkhhbmRsZXIobWVzc2FnZS50eXBlLCBldmVudC5tZXNzYWdlLnRleHQsIGV2ZW50LnNvdXJjZS51c2VySWQpXG4gICAgaWYgKHNob3BwaW5nTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHNob3BwaW5nTGlzdC5tYXAodmFsdWUgPT4gcmVwbHlUZXh0LnB1c2godmFsdWUpKVxuICAgIH1cbiAgICByZXR1cm4gY2xpZW50LnJlcGx5TWVzc2FnZShldmVudC5yZXBseVRva2VuLCBidWlsZFJlcGx5VGV4dChyZXBseVRleHQpKVxufVxuXG5leHBvcnQgY29uc3QgaGFuZGxlcjogTGFtYmRhLkFQSUdhdGV3YXlQcm94eUhhbmRsZXIgPSBhc3luYyAocHJveHlFZXZlbnQ6IExhbWJkYS5BUElHYXRld2F5RXZlbnQsIF9jb250ZXh0KSA9PiB7XG4gICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocHJveHlFZXZlbnQpKVxuXG4gICAgY29uc3Qgc2lnbmF0dXJlID0gcHJveHlFZXZlbnQuaGVhZGVyc1snWC1MaW5lLVNpZ25hdHVyZSddXG4gICAgaWYgKCFMaW5lLnZhbGlkYXRlU2lnbmF0dXJlKHByb3h5RWV2ZW50LmJvZHkhLCBjaGFubmVsU2VjcmV0LCBzaWduYXR1cmUpKSB7XG4gICAgICAgIHRocm93IG5ldyBMaW5lLlNpZ25hdHVyZVZhbGlkYXRpb25GYWlsZWQoJ3NpZ25hdHVyZSB2YWxpZGF0aW9uIGZhaWxlZCcsIHNpZ25hdHVyZSlcbiAgICB9XG5cbiAgICBjb25zdCBib2R5OiBMaW5lLldlYmhvb2tSZXF1ZXN0Qm9keSA9IEpTT04ucGFyc2UocHJveHlFZXZlbnQuYm9keSEpXG4gICAgYXdhaXQgUHJvbWlzZVxuICAgICAgICAuYWxsKGJvZHkuZXZlbnRzLm1hcChhc3luYyBldmVudCA9PiBldmVudEhhbmRsZXIoZXZlbnQgYXMgVHlwZXMuTWVzc2FnZUV2ZW50KSkpXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIuTWVzc2FnZSlcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogNTAwLFxuICAgICAgICAgICAgICAgIGJvZHk6ICdFcnJvcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6ICdPSydcbiAgICB9XG59Il19