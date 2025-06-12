import { BookService } from './book.service';
import { Book } from './book.type';
export declare class BookResolver {
    private readonly bookService;
    constructor(bookService: BookService);
    books(): Promise<Book[]>;
    book(id: string): Promise<Book>;
    createBook(title: string, author: string, description: string, publishedYear: number, publisher: string, image: string): Promise<Book>;
    updateBook(id: string, title?: string, author?: string, description?: string, publishedYear?: number, publisher?: string, image?: string): Promise<Book>;
    removeBook(id: string): Promise<boolean>;
}
