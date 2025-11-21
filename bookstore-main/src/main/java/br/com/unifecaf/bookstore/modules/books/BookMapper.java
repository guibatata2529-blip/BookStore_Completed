package br.com.unifecaf.bookstore.modules.books;

import org.springframework.stereotype.Component;

@Component
public class BookMapper {

    public BookModel map(BookDTO bookDTO) {
        BookModel bookModel = new BookModel();
        bookModel.setId(bookDTO.getId());
        bookModel.setTitle(bookDTO.getTitle());
        bookModel.setSynopsis(bookDTO.getSynopsis());

        return bookModel;
    }

    public BookDTO map(BookModel bookModel) {
        BookDTO bookDTO = new BookDTO();
        bookDTO.setId(bookModel.getId());
        bookDTO.setTitle(bookModel.getTitle());
        bookDTO.setSynopsis(bookModel.getSynopsis());

        return bookDTO;
    }

}

