-- Adicionar campo de preço aos livros
ALTER TABLE tb_books ADD COLUMN IF NOT EXISTS price DECIMAL(10, 2) NOT NULL DEFAULT 0.00;

-- Atualizar preços dos livros existentes
UPDATE tb_books SET price = 45.90 WHERE id = 1;  -- 1984
UPDATE tb_books SET price = 89.90 WHERE id = 2;  -- O Senhor dos Anéis
UPDATE tb_books SET price = 35.00 WHERE id = 3;  -- Dom Casmurro
UPDATE tb_books SET price = 55.90 WHERE id = 4;  -- Harry Potter
UPDATE tb_books SET price = 29.90 WHERE id = 5;  -- O Pequeno Príncipe
UPDATE tb_books SET price = 52.90 WHERE id = 6;  -- Cem Anos de Solidão
UPDATE tb_books SET price = 48.90 WHERE id = 7;  -- O Hobbit
UPDATE tb_books SET price = 38.90 WHERE id = 8;  -- A Revolução dos Bichos
UPDATE tb_books SET price = 42.90 WHERE id = 9;  -- O Código Da Vinci
UPDATE tb_books SET price = 39.90 WHERE id = 10; -- Orgulho e Preconceito
