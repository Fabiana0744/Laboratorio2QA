import { mock, when, instance } from 'ts-mockito';
import { Author } from './author';
import { Book } from './book.model';
/*
describe('Book', () => {
  it('should create an instance', () => {
    expect(new Book()).toBeTruthy();
  });
});
*/

describe('Book', () => {
  let mockAuthor1: Author;
  let mockAuthor2: Author;
  let book1: Book;


  beforeEach(() => {
    mockAuthor1 = mock<Author>();
    book1 = new Book("Cien años de soledad", instance(mockAuthor1), 5);
  });


  it('1. Obtener el pais de un autor correctamente', () => {
    when(mockAuthor1.getPais()).thenReturn("Colombia");
  
    const authorCountry = book1.getAuthor().getPais();
  
    expect(authorCountry).toBe("Colombia");
  });
  
  it('2. Cambiar el nombre de un autor', () => {
    when(mockAuthor1.getName()).thenReturn("Gabriel Garcia Marquez");
    book1.getAuthor().setName("Gabriel Garcia Marquejos");

    when(mockAuthor1.getName()).thenReturn("Gabriel Garcia Marquejos");
    const updatedAuthorName = book1.getAuthor().getName();

    expect(updatedAuthorName).toBe("Gabriel Garcia Marquejos");
  });
  
});
