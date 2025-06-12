"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const book_service_1 = require("./book.service");
const book_type_1 = require("./book.type");
let BookResolver = class BookResolver {
    constructor(bookService) {
        this.bookService = bookService;
    }
    async books() {
        return this.bookService.findAll();
    }
    async book(id) {
        return this.bookService.findOne(id);
    }
    async createBook(title, author, description, publishedYear, publisher, image) {
        return this.bookService.create({
            title,
            author,
            description,
            publishedYear,
            publisher,
            image,
        });
    }
    async updateBook(id, title, author, description, publishedYear, publisher, image) {
        return this.bookService.update(id, {
            title,
            author,
            description,
            publishedYear,
            publisher,
            image,
        });
    }
    async removeBook(id) {
        return this.bookService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Query)(() => [book_type_1.Book]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "books", null);
__decorate([
    (0, graphql_1.Query)(() => book_type_1.Book),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "book", null);
__decorate([
    (0, graphql_1.Mutation)(() => book_type_1.Book),
    __param(0, (0, graphql_1.Args)('title')),
    __param(1, (0, graphql_1.Args)('author')),
    __param(2, (0, graphql_1.Args)('description', { nullable: true })),
    __param(3, (0, graphql_1.Args)('publishedYear')),
    __param(4, (0, graphql_1.Args)('publisher')),
    __param(5, (0, graphql_1.Args)('image')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number, String, String]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "createBook", null);
__decorate([
    (0, graphql_1.Mutation)(() => book_type_1.Book),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('title', { nullable: true })),
    __param(2, (0, graphql_1.Args)('author', { nullable: true })),
    __param(3, (0, graphql_1.Args)('description', { nullable: true })),
    __param(4, (0, graphql_1.Args)('publishedYear', { nullable: true })),
    __param(5, (0, graphql_1.Args)('publisher', { nullable: true })),
    __param(6, (0, graphql_1.Args)('image', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Number, String, String]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "updateBook", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "removeBook", null);
BookResolver = __decorate([
    (0, graphql_1.Resolver)(() => book_type_1.Book),
    __metadata("design:paramtypes", [book_service_1.BookService])
], BookResolver);
exports.BookResolver = BookResolver;
//# sourceMappingURL=book.resolver.js.map