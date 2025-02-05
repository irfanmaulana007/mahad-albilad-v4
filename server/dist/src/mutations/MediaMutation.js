"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schemaBuilder_1 = __importDefault(require("../libs/schemaBuilder"));
schemaBuilder_1.default.mutationField('uploadMedia', (t) => t.field({
    type: 'MediaUploadResult',
    args: {
        file: t.arg({
            type: 'File',
            required: true,
        }),
    },
    resolve: async (parent, args, context, info) => {
        return await context.MediaService.uploadMedia(args.file);
    },
}));
//# sourceMappingURL=MediaMutation.js.map