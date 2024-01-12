```
> Feature Auth

-- Rota Login
--- Validar os dados do usuários como: email e password - ok
--- Criar e retornar o Token JWT e Refresh Token - ok
--- Refresh Token deve possuir apenas ID - ok

-- Rota Token
--- Assim que o tempo do JWT expirar, devemos criar o seu refresh - ok
--- O Refresh token deve ser utilizado para gerar um novo token - ok
--- Criar e retornar o Token JWT e Refresh Token - ok
--- Refresh Token deve possuir apenas ID - ok

-- Débitos técnicos User --

--- Read
---- Autorização: só pode acessar a rota Logado - ok
---- Não pode ler outro usuário - ok

--- Update
---- Autorização: só pode acessar a rota Logado - ok
---- Não pode editar outro usuário - ok

-- Delete
---- Autorização: só pode acessar a rota Logado - ok
---- Não pode deletar outro usuário - ok
```
