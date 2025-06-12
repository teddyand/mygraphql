import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from './book.type';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => [Book])
  async books(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Query(() => Book)
  async book(@Args('id') id: string): Promise<Book> {
    return this.bookService.findOne(id);
  }

  @Mutation(() => Book)
  async createBook(
    @Args('title') title: string,
    @Args('author') author: string,
    @Args('description', { nullable: true }) description: string,
    @Args('publishedYear') publishedYear: number,
    @Args('publisher') publisher: string,
    @Args('image') image: string,
  ): Promise<Book> {    
    return this.bookService.create({
      title,
      author,
      description,
      publishedYear,
      publisher,
      image,
    });
  }

  @Mutation(() => Book)
  async updateBook(
    @Args('id') id: string,
    @Args('title', { nullable: true }) title?: string,
    @Args('author', { nullable: true }) author?: string,
    @Args('description', { nullable: true }) description?: string,
    @Args('publishedYear', { nullable: true }) publishedYear?: number,
    @Args('publisher', { nullable: true }) publisher?: string,
    @Args('image', { nullable: true }) image?: string,
  ): Promise<Book> {
    return this.bookService.update(id, {
      title,
      author,
      description,
      publishedYear,
      publisher,
      image,
    });
  }

  @Mutation(() => Boolean)
  async removeBook(@Args('id') id: string): Promise<boolean> {
    return this.bookService.remove(id);
  }
} 