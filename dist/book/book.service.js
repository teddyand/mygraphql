"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const common_1 = require("@nestjs/common");
let BookService = class BookService {
    constructor() {
        this.books = [
            {
                id: '1',
                title: 'The Great Gatsby',
                author: 'F. Scott Fitzgerald',
                description: 'A story of the fabulously wealthy Jay Gatsby',
                publishedYear: 1925,
                publisher: 'Charles Scribner\'s Sons',
                image: 'gatsby.jpg'
            },
            {
                id: '2',
                title: '1984',
                author: 'George Orwell',
                description: 'A dystopian social science fiction novel',
                publishedYear: 1949,
                publisher: 'Secker and Warburg',
                image: '1984.jpg'
            },
        ];
    }
    findAll() {
        return this.books;
    }
    findOne(id) {
        const book = this.books.find(book => book.id === id);
        if (!book) {
            throw new common_1.NotFoundException(`Book with ID ${id} not found`);
        }
        return book;
    }
    create(book) {
        const newBook = Object.assign({ id: (this.books.length + 1).toString() }, book);
        this.books.push(newBook);
        return newBook;
    }
    update(id, updateBook) {
        const bookIndex = this.books.findIndex(book => book.id === id);
        if (bookIndex === -1) {
            throw new common_1.NotFoundException(`Book with ID ${id} not found`);
        }
        this.books[bookIndex] = Object.assign(Object.assign({}, this.books[bookIndex]), updateBook);
        return this.books[bookIndex];
    }
    remove(id) {
        const bookIndex = this.books.findIndex(book => book.id === id);
        if (bookIndex === -1) {
            throw new common_1.NotFoundException(`Book with ID ${id} not found`);
        }
        this.books.splice(bookIndex, 1);
        return true;
    }
};
BookService = __decorate([
    (0, common_1.Injectable)()
], BookService);
exports.BookService = BookService;
//# sourceMappingURL=book.service.js.map