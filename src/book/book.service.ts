import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './book.type';

@Injectable()
export class BookService {
  private books: Book[] = [
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

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: string): Book {
    const book = this.books.find(book => book.id === id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  create(book: Omit<Book, 'id'>): Book {
    const newBook = {
      id: (this.books.length + 1).toString(),
      ...book,
    };
    this.books.push(newBook);
    return newBook;
  }

  update(id: string, updateBook: Partial<Omit<Book, 'id'>>): Book {
    const bookIndex = this.books.findIndex(book => book.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    
    this.books[bookIndex] = {
      ...this.books[bookIndex],
      ...updateBook,
    };
    
    return this.books[bookIndex];
  }

  remove(id: string): boolean {
    const bookIndex = this.books.findIndex(book => book.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    
    this.books.splice(bookIndex, 1);
    return true;
  }
}