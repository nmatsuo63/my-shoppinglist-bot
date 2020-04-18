"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageType;
(function (MessageType) {
    MessageType[MessageType["Confirm"] = 0] = "Confirm";
    MessageType[MessageType["Clear"] = 1] = "Clear";
    MessageType[MessageType["Add"] = 2] = "Add";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
exports.conversation = (message) => {
    switch (message) {
        case 'リストを表示':
            return { message: '現在の買い物リストです。', type: MessageType.Confirm };
        case 'リストをクリア':
            return { message: 'リストをクリアしました', type: MessageType.Clear };
        default:
            return { message: `${message}をリストに追加します。`, type: MessageType.Add };
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVyc2F0aW9uTW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb252ZXJzYXRpb25Nb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLElBQVksV0FJWDtBQUpELFdBQVksV0FBVztJQUNuQixtREFBTyxDQUFBO0lBQ1AsK0NBQUssQ0FBQTtJQUNMLDJDQUFHLENBQUE7QUFDUCxDQUFDLEVBSlcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFJdEI7QUFPWSxRQUFBLFlBQVksR0FBRyxDQUFDLE9BQWUsRUFBYyxFQUFFO0lBQ3hELFFBQVEsT0FBTyxFQUFFO1FBQ2IsS0FBSyxRQUFRO1lBQ1QsT0FBTyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNqRSxLQUFLLFNBQVM7WUFDVixPQUFPLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQzlEO1lBQ0ksT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLE9BQU8sYUFBYSxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUE7S0FDekU7QUFDTCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZW51bSBNZXNzYWdlVHlwZSB7XG4gICAgQ29uZmlybSxcbiAgICBDbGVhcixcbiAgICBBZGQsXG59XG5cbmludGVyZmFjZSBSZXBseU1vZGVsIHtcbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgdHlwZTogTWVzc2FnZVR5cGUsXG59XG5cbmV4cG9ydCBjb25zdCBjb252ZXJzYXRpb24gPSAobWVzc2FnZTogc3RyaW5nKTogUmVwbHlNb2RlbCA9PiB7XG4gICAgc3dpdGNoIChtZXNzYWdlKSB7XG4gICAgICAgIGNhc2UgJ+ODquOCueODiOOCkuihqOekuic6XG4gICAgICAgICAgICByZXR1cm4geyBtZXNzYWdlOiAn54++5Zyo44Gu6LK344GE54mp44Oq44K544OI44Gn44GZ44CCJywgdHlwZTogTWVzc2FnZVR5cGUuQ29uZmlybSB9XG4gICAgICAgIGNhc2UgJ+ODquOCueODiOOCkuOCr+ODquOCoic6XG4gICAgICAgICAgICByZXR1cm4geyBtZXNzYWdlOiAn44Oq44K544OI44KS44Kv44Oq44Ki44GX44G+44GX44GfJywgdHlwZTogTWVzc2FnZVR5cGUuQ2xlYXIgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHsgbWVzc2FnZTogYCR7bWVzc2FnZX3jgpLjg6rjgrnjg4jjgavov73liqDjgZfjgb7jgZnjgIJgLCB0eXBlOiBNZXNzYWdlVHlwZS5BZGQgfVxuICAgIH1cbn0iXX0=