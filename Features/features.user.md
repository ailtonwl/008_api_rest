Tarefas
Vamos seguir essa lógica de tarefas, tentando simular parte do mundo real na área de trabalho.
Escrevemos depois codamos, assim seremos mais acertivos.

```
> Feature User
-- Model user ( nome, email, password, data de criação, data de alteração ) - ok

-- Crud user

-- Create
--- Nome ( opcional ), Email e password devem ser obrigatórios - ok
--- Id deve ser criado com uuid - ok
--- Os usuários devem conter emails únicos - ok
--- Password deve ser encriptado - ok
--- Assim que o usuário for criado, deve ser criada uma pasta com id dele - ok
---- Iremos armazenar todos seus arquivos - ok
---- assets/files/:id - ok

-- Read
--- Uuid é obrigatório para efetuar a leitura - ok
--- Leitura do usuário deve ser feita pelo uuid - ok
--- Não teremos o read all ou list all - ok

--- Débitos Técnicos
--- Autorização: só pode acessar a rota Logado
--- Não pode ler outro usuário

-- Update
--- Uuid é obrigatório para efetuar a edição - ok
--- A edição é somente para o name - ok

--- Débitos Técnicos
--- Autorização: só pode acessar a rota Logado
--- Não pode editar outro usuário

-- Delete
--- Todos os dados deste usuário devem ser deletados, como:
---- Arquivos
---- Dados no banco
---- Tudo relacionado a ele
---- OBS.: Caso você utilize esta ferramenta para venda, leia mais sobre LGPD

--- Débitos Técnicos
--- Autorização: só pode acessar a rota Logado
--- Não pode deletar outro usuário
```
