import { Book } from './book.type';
export declare class BookService {
    private books;
    findAll(): Book[];
    findOne(id: string): Book;
    create(book: Omit<Book, 'id'>): Book;
    update(id: string, updateBook: Partial<Omit<Book, 'id'>>): Book;
    remove(id: string): boolean;
}
