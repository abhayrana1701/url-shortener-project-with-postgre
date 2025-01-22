"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = void 0;
const express_validator_1 = require("express-validator");
exports.authUser = [
    (0, express_validator_1.body)('email').notEmpty().withMessage('email is required').isString().withMessage('email must be a string'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('password is required').isString().withMessage('password must be a string'),
];
//# sourceMappingURL=user.validation.js.map