package br.com.unifecaf.bookstore.modules.books;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookService {
    private final BookRepository bookRepository;
    private final BookMapper bookMapper;

    public BookService(BookRepository bookRepository, BookMapper bookMapper) {
        this.bookRepository = bookRepository;
        this.bookMapper = bookMapper;
    }

    public List<BookDTO> getBooks() {
        List<BookModel> books = bookRepository.findAll();
        return books.stream()
                .map(bookMapper::map)
                .collect(Collectors.toList());
    }

    public BookDTO getBookById(Long id) {
        Optional<BookModel> book = bookRepository.findById(id);
        return book.map(bookMapper::map).orElse(null);
    }

    public BookDTO updateBookById(Long id, BookDTO bookDTO) {
        Optional<BookModel> existsBook = bookRepository.findById(id);

        if (existsBook.isPresent()) {
            BookModel updatedBook = bookMapper.map(bookDTO);
            updatedBook.setId(id);

            BookModel savedBook = bookRepository.save(updatedBook);
            return bookMapper.map(savedBook);
        }

        return null;
    }

    public BookDTO createBook(BookDTO bookDTO) {
        BookModel book = bookMapper.map(bookDTO);
        book = bookRepository.save(book);
        return bookMapper.map(book);
    }

    public void deleteBookById(Long id) {
       bookRepository.deleteById(id);
    }
}
