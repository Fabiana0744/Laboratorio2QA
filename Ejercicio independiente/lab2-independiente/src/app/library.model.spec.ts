import { Library } from './library.model';
import { Book } from './book.model';
import { Author } from './author';
import { mock, instance, when } from 'ts-mockito';

describe('Library', () => {
  it('should create an instance', () => {
    expect(new Library()).toBeTruthy();
  });
});


describe('Library', () => {
  let library: Library;
  let mockAuthor: Author;

  beforeEach(() => {
    library = new Library();
    mockAuthor = mock<Author>();      
  });

  it('1. Encontrar un libro por el nombre del autor', () => {
    when(mockAuthor.getName()).thenReturn("Gabriel Garcia Marquez");
    const book = new Book("Cien Años de Soledad", instance(mockAuthor), 5);
    library.addBook(book);

    const resultLibrary = library.searchByAuthor("Gabriel Garcia Marquez");

    expect(resultLibrary.size()).toBe(1);
    expect(resultLibrary.getBooks()[0].getTitle()).toBe("Cien Años de Soledad");
  });


  it('2. Encontrar múltiples libros por el mismo autor', () => {
    when(mockAuthor.getName()).thenReturn("Gabriel Garcia Marquez");
    const book1 = new Book("Cien Años de Soledad", instance(mockAuthor), 5);
    const book2 = new Book("El Otoño del Patriarca", instance(mockAuthor), 4);
    library.addBook(book1);
    library.addBook(book2);

    const resultLibrary = library.searchByAuthor("Gabriel Garcia Marquez");

    expect(resultLibrary.size()).toBe(2);
  });
});
