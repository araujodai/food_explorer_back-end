<div align="center">
  <img alt="Logo Food Explorer" width="150" src="https://github.com/araujodai/food_explorer_front-end/blob/main/src/assets/logo.svg">
  
  <h1>Food Explorer API</h1>
  
  <p>
    Food Explorer API é uma aplicação que simula um cardápio de um restaurante fictício, conta com front-end e back-end desenvolvidos com tecnologias aprendidas na trilha Explorer da Rocketseat.
  </p>
  
  <p>
    <a href="#projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#instalacão">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#utilização">Utilização</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#funcionalidades">Funcionalidades</a>
  </p>
</div>

## Projeto 
O projeto conta com front-end e back-end desenvolvidos com tecnologias aprendidas na trilha Explorer da Rocketseat. A aplicação pode ser utilizada através de um login com e-mail e senha, que deve ser registrado previamente, e conta com dois tipos de usuário, usuário comum e administrador.

Você pode testar a aplicação completa através desse [link](https://moonlit-biscochitos-4e4bda.netlify.app/) ou, escaneando o QR Code abaixo:

<p align="left">
  <img height="200" width="200" alt="QR Code containing the project URL" src="https://github.com/user-attachments/assets/4ff86cfe-27a1-4c5e-b347-4ef3ec6dc0a2">
</p>


Para logar na aplicação e testar suas fucionalidades, utilize um dos logins já existentes listados abaixo:

| Tipo  | E-mail           | Senha        |
|-------|------------------|--------------|
| USER  | user@email.com   | usertest123  |
| ADMIN | admin@email.com  | 123456       |



  ### Tecnologias utilizadas:
  
  - Nodejs
  - JavaScript
  - Express
  - Sqlite
  - Knex
  - Multe
  - PM2
  
  Deploy: Render
  
  Testes de requisições: Insomnia


*Confira também o front-end dessa aplicação disponibilizado no repositório [FoodExplorer front-end](https://github.com/araujodai/food_explorer_front-end)*

<br><br>

## Funcionalidades
A aplicação conta com dois tipos de persona, usuário comum e usuário administrador. Abaixo veremos a listagem das funcionalidades da aplicação de acordo com o tipo de usuário juntamente com uma terceira listagem contendo funcionalidades disponiveis em ambos perfis. Para funcionalidades disponíveis para ambos os tipos de usuários, o recurso devolvido através do response pode ser diferente.

USER/ADMIN:
- Iniciar seção
- Listar pratos
- Buscar pratos
- Visualizar prato

USER:
- Adicionar pra aos favoritos
- Listar favoritos
- Adicionar pratos ao carrinho
- Criar pedido
- Listar e visualizar pedidos do usuário
  
ADMIN:
- Criar novo prato
- Editar e/ou remover pratos
- Listar, visualizar e atualizar pedidos
- Atualizar usuário (sem interface gráfica no front-end)

<br><br>

## Instalação
Para rodar o projeto localmente será necessário primeiro clonar o projeto, selecione um local ou pasta de sua escolha para armazenar o projeto e acesse o caminho via terminal.

Após selecionar o caminho de sua escolha, execute o comando abaixo:
```bash
git clone https://github.com/araujodai/food_explorer_back-end
```

Acesse o diretório do projeto:
```bash
cd food_explorer_back-end
```

Instale as dependências:
```bash
npm install
```

Inicie o servidor:
```bash
npm run dev
```

<br><br>

## Utilização
Você pode utilizar a aplicação completa através desse [link](https://moonlit-biscochitos-4e4bda.netlify.app/).

Essa aplicação também pode ser testada localmente em conjunto com o front-end desse projeto, basta seguir a documentação do FoodExplorer front-end [clicando aqui](https://github.com/araujodai/food_explorer_front-end).
<br><br>

Para rodar o projeto localmente podemos utilizar o Insomnia para realizar nossas requisições, basta clicar [aqui](https://insomnia.rest/download) para baixar.

- Depois de instalado, crie uma Collection clicando em *CREATE* -> *REQUEST COLLECTION* e atribua um nome.
- Com a Collection criada, clique em *New HTTP Request*.
- **Selecionar o Método HTTP**:
  Escolha o método HTTP adequado (GET, POST, PUT, DELETE, etc.) para sua requisição.
  
- **Configurar a URL**:
  Insira a URL do endpoint ao qual você deseja fazer a requisição (`localhost:3333/resource`)
  
- **Adicionar o Corpo da Requisição**:
  Clique na aba "Body" para adicionar o corpo da requisição (se houver) e selecione o tipo do corpo, somente usaremos JSON ou Multipart Form.
  - Para JSON:
     ```json
     {
       "chave": "valor",
       "outroCampo": "outroValor"
     }
     ```
  - Para Multipart Form:
     Adicione os campos necessários clicando em "Add". Para cada campo, preencha:
    | Key       | Type   | Value               |
    |-----------|--------|---------------------|
    | name      | text   | Nome Exemplo        |
    | image     | file   | [Selecionar imagem] |
  
  
- **Enviar a Requisição**:
  Clique em "Send" para enviar a requisição e visualizar a resposta na aba "Preview".


<br><br>

## Funcionalidades
Todas as funcionalidades contam com o método HTTP a ser utilizado no título da funcionalidade (GET, POST, PUT, DELETE, etc), o endpoint contendo o recurso e/ou parâmetros 
será descrito dentro dos detalhes da funcionalidade, algumas funcionalidades podem passar por melhorias ou foram incluídas visando alguma melhoria, sempre que finalizada essa documentação será atualizada.

Como montar a requisição com essa documentação:
| Method           | Base URL         | Resource    | Parameter |
|------------------|------------------|-------------|-----------|
| título  (METHOD) | `localhost:3333` | `/resource` | `/:id`    |


### Criar usuário (POST)
Permite a um usuário se registrar na aplicação, somente usuários cadastrados podem utilizar a aplicação.

***Endpoint:*** `localhost:3333/users`

***Corpo da requisição:***
```json
{
	"name": "Nome do usuário exemplo",
	"email": "exemplo@email.com",
	"password": "123456"
}
```

Por padrão, o usuário criado é do tipo comum, para criar usuários com permissões de administrador, basta adicionar o campo "is_admin" como sendo verdadeiro.
```json
{
	"is_admin": 1
}
```

*Essa funcionalidade não possui nenhum conteúdo de resposta, somente a confirmação na aba preview.*

<br><br>

### Criar sessão (POST)
Inicia sessão dando acesso a área logada da aplicação. Após iniciada a seção recemos os dados do usuário registrado.

***Endpoint:*** `localhost:3333/sessions`

***Corpo da requisição:***
```json
{
	"email": "exemplo@email.com",
	"password": "123456"
}
```

Exemplo de resposta esperada:
```json
{
	"user": {
		"id": 2,
		"name": "Nome do usuário exemplo",
		"email": "exemplo@email.com",
		"password": "fsdf1dsf415sd4f0s5df4s64f6s",
		"is_admin": 0
	},
	"token": "edls5d6fdf6df5d6f5d6f59.edsfsdfdsE3MjI2MsdfsdfsdfiMiJ9.JsdfVpdfAq36S-xfdsfsdfdsf"
}
```
<br>

> [!TIP]
> O conteúdo do campo "token" pode ser usado na aba "Bearer" do Insomnia para validar as requisições realizadas nas funcionalidades seguintes, copie o conteúdo e cole no
> campo "TOKEN", caso tenha importado o modelo de Collection do Insomnia disponibilizado anteriormente, ignore esse esse trecho.

<br><br>

### Atualizar usuário (PUT)
Atualiza os dados de um usuário logado, essa funcionalidade não conta com interface gráfica no front-end dessa aplicação, somente está disponível no 
back-end para melhorias futuras. 

***Endpoint:*** `localhost:3333/users`

***Corpo da requisição:***
```json
{
	"name": "user",
	"email": "user@email.com",
	"password": "654321",
	"old_password": "123456",
	"is_admin" : 0
}
```
*O campo "is_admin" somente pode ser modificado por usuários administradores*

<br><br>

### Menu
Este recurso permite gerenciar os pratos disponíveis na aplicação. Adicione `/menu` ao final da URL para acessar 
diversas funcionalidades, como criar, listar, exibir, editar e excluir pratos.

- #### Criar prato (POST) ![Static Badge](https://img.shields.io/badge/admin-3366ff)
  Cria um novo prato para ser disponibilizado no menu da aplicação, disponível somente para usuários administradores. Para criar um novo
  prato precisaremos passar nome, categoria, descrição, preço, ingredientes e a foto do prato no corpo da requisição.
  
  ***Endpoint***: `localhost:3333/menu`

  ***Corpo da requisição:***
  - Para JSON (sem imagem):
      ```json
      {
      	"name": "Prato exemplo 2",
      	"description": "Descrição exemplo do prato",
      	"price": 9.99,
      	"category": "drinks",
      	"ingredients": "[\"exemplo1\", \"exemplo2\", \"exemplo3\"]"
      }
      ```
      *É possível editar o prato futuramente, sendo assim adicionar uma imagem no momento do cadastro nao é obrigatório.*
    
  

  - Para Multipart Form (com imagem):
      | Key        | Type   | Value                         |
      |------------|--------|-------------------------------|
      | name       | Text   | Nome Exemplo                  |
      | description| Text   | Descrição Exemplo             |
      | price      | Text   | 19.99                         |
      | category   | Text   | Categoria Exemplo             |
      | ingredients| Text   | ["ingrediente1", "ingrediente2"]|
      | image      | File   | [Selecionar imagem]           |

  
  Para cadastrar novos pratos utilize uma das categorias disponíveis:
  ```array
  categories = [
    { label: "Entradas", value: "entrances" },
    { label: "Refeições", value: "meals" },
    { label: "Sobremesas", value: "desserts" },
    { label: "Bebidas", value: "drinks" },
    { label: "Porções", value: "portions" },
  ];
  ```

  <br>

- #### Listar pratos (GET) ![Static Badge](https://img.shields.io/badge/user-339900) ![Static Badge](https://img.shields.io/badge/admin-3366ff)
  Exibe todos os pratos cadastrados, utilize para obter o ID de um prato específico se necessário. Essa funcionalidade está disponível para ambos tipos de usuário.

  ***Endpoint:*** `localhost:3333/menu`

  ***Corpo da requisição:***
  > Não é necessário enviar nenhum conteúdo no corpo da requisição. Apenas a URL e os parâmetros de consulta (se houver) são utilizados.

  Exemplo de resposta esperada:
  ```json
  [
  	{
  		"id": 3,
  		"name": "Prato exemplo 2",
  		"description": "Descrição exemplo do prato",
  		"price": 9.99,
  		"category": "drinks",
  		"image": null,
  		"created_at": "2024-08-02 21:24:16",
  		"updated_at": "2024-08-02 21:24:16"
  	},
  	{
  		"id": 4,
  		"name": "Prato exemplo",
  		"description": "Descrição exemplo do prato",
  		"price": 9.99,
  		"category": "drinks",
  		"image": "60297f1f8b8f7633dc38-espresso.png",
  		"created_at": "2024-08-02 21:28:48",
  		"updated_at": "2024-08-02 21:28:48"
  	}
  ]
  ```

<br>

- #### Exibir prato (GET) ![Static Badge](https://img.shields.io/badge/user-339900) ![Static Badge](https://img.shields.io/badge/admin-3366ff)
  Exibe todos os detalhes de um prato específico, disponível para ambos tipos de usuários. Para exibir um prato cadastrado iremos
  utilizar a URL abaixo substituindo `/:menu_item_id` pelo ID do prato.

  ***Endpoint*** `localhost:3333/menu/:menu_item_id`

  ***Corpo da requisição:***
  > Não é necessário enviar nenhum conteúdo no corpo da requisição. Apenas a URL e os parâmetros de consulta (se houver) são utilizados.

  Exemplo de resposta esperada: 
  ```json
  {
  	"id": 4,
  	"name": "Prato exemplo",
  	"description": "Descrição exemplo do prato",
  	"price": 9.99,
  	"category": "drinks",
  	"image": "60297f1f8b8f7633dc38-espresso.png",
  	"created_at": "2024-08-02 21:28:48",
  	"updated_at": "2024-08-02 21:28:48",
  	"ingredients": [
  		{
  			"id": 4,
  			"menu_item_id": 4,
  			"name": "ingrediente1"
  		},
  		{
  			"id": 5,
  			"menu_item_id": 4,
  			"name": "ingrediente2"
  		}
  	]
  }
  ```

<br>

- #### Editar prato (PUT) ![Static Badge](https://img.shields.io/badge/admin-3366ff)
  Atualiza as informações de um prato cadastrado anteriormente, somente usuários administradores tem acesso a essa funcionalidade. Para atualizar um prato será necessário
  utilizar a URL abaixo substituindo `/:menu_item_id` pelo ID do prato, passaremos as informações no corpo da requisição conforme feito na criação do prato.

  ***Endpoint*** `localhost:3333/menu/:menu_item_id`

  ***Corpo da requisição:***
  - Para JSON (sem imagem):
    ```json
    {
      "name": "Prato Exemplo atualizado",
      "description": "Descrição exemplo atualizada",
      "price": 29.99,
      "category": "entrances",
      "ingredients": ["update1", "update2", "update3"]
    }
    ```

  - Para Multipart Form (somente com imagem):
    | Key        | Type   | Value                         |
    |------------|--------|-------------------------------|
    | image      | File   | [Selecionar imagem]           |

<br>

- #### Excluir prato (DELETE) ![Static Badge](https://img.shields.io/badge/admin-3366ff)
  Remove um prato do menu permanentemente, disponível somente para usuários administradores. Substitua o `/:menu_item_id` passado como parâmtro na URL abaixo pelo ID do prato
  a ser removido.
  
  ***Endpoint:*** `localhost:3333/menu/:menu_item_id`

  ***Corpo da requisição:***
  > Não é necessário enviar nenhum conteúdo no corpo da requisição. Apenas a URL e os parâmetros de consulta (se houver) são utilizados.

  *Essa funcionalidade não possui nenhum conteúdo de resposta, somente a confirmação na aba preview.*

<br><br>

### Pedidos
Este recurso permite gerenciar os pedidos criados na aplicação. Adicione `/orders` ao final da URL para acessar 
as funcionalidades criar, listar, exibir e editar pedidos.

- #### Criar pedido (POST) ![Static Badge](https://img.shields.io/badge/user-339900)
  Cria um pedido vinculado ao usuário logado, essa funcionalidade está disponível somente para usuários comuns. Para utilizar sem interface gráfica será necessário passar
  no corpo da requisição um array contendo o ID do prato juntamente com a quantidade para cada item, o método de pagamento e o total do pedido.
  
  ***Endpoint:*** `localhost:3333/orders`

  ***Corpo da requisição:***
  ```json
  {
    "cart_items": [
      {
        "id": 3,
        "quantity": 1
      },
      {
        "id": 4,
        "quantity": 1
      }
    ],
  	"amount": 19.98,
  	"payment_method": "pix"
  }
  ```
  *No momento essa funcionalidade recebe o total do pedido no corpo da requisição pois não é calculada no back-end, serão feitas melhorias em breve,
  removendo essa responsabilidade do front-end.*

  Exemplo de resposta esperada:
  ```json
  {
  	"order_id": 2
  }
  ```
  
  <br>
  
- #### Listar pedidos (GET) ![Static Badge](https://img.shields.io/badge/user-339900) ![Static Badge](https://img.shields.io/badge/admin-3366ff)
  Se o usuário logado for do tipo comum, exibe todos os pedidos vinculados a esse usuário, se for do tipo administrador, todos os pedidos da plataforma serão exibidos.

  ***Endpoint:*** `localhost:3333/orders`

  ***Corpo da requisição:***
  > Não é necessário enviar nenhum conteúdo no corpo da requisição. Apenas a URL e os parâmetros de consulta (se houver) são utilizados.

  Exemplo de resposta esperada:
  ```json
  [
  	{
  		"id": 2,
  		"user_id": 2,
  		"total_price": 19.98,
  		"created_at": "2024-08-02 22:22:56",
  		"payment_method": "pix",
  		"status": "pending",
  		"items": [
  			{
  				"menu_item_id": 3,
  				"quantity": 1,
  				"menu_item_name": "Prato exemplo 2"
  			},
  			{
  				"menu_item_id": 4,
  				"quantity": 1,
  				"menu_item_name": "Prato exemplo"
  			}
  		]
  	}
  ]
  ```
  
<br>

- #### Visualizar pedido (GET) ![Static Badge](https://img.shields.io/badge/user-339900) ![Static Badge](https://img.shields.io/badge/admin-3366ff)
  Exibe os detalhes de um pedido específico, disponível para ambos tipos de usuários. Substitua o `/:order_id` passado como parâmtro na URL abaixo pelo ID do pedido a
  ser visualizado.

  ***Endpoint:*** `localhost:3333/orders/:order_id`

  ***Corpo da requisição:***
  > Não é necessário enviar nenhum conteúdo no corpo da requisição. Apenas a URL e os parâmetros de consulta (se houver) são utilizados.
  
  Exemplo de resposta esperada:
  ```json
  {
  	"id": 2,
  	"user_id": 2,
  	"total_price": 19.98,
  	"created_at": "2024-08-02 22:22:56",
  	"payment_method": "pix",
  	"status": "pending",
  	"order_items": [
  		{
  			"id": 3,
  			"quantity": 1,
  			"name": "Prato exemplo 2",
  			"price": 9.99,
  			"image": null
  		},
  		{
  			"id": 4,
  			"quantity": 1,
  			"name": "Prato exemplo",
  			"price": 9.99,
  			"image": "60297f1f8b8f7633dc38-espresso.png"
  		}
  	]
  }
  ```

<br>

- #### Atualizar pedido (PUT) ![Static Badge](https://img.shields.io/badge/admin-3366ff)
  Atualiza o status de um pedido existente, essa funcionalida está disponível somente para usuários administradores. Substitua o `/:order_id` passado
  como parâmtro na URL abaixo pelo ID do pedido a ser atualizado. No corpo da requisição deve ser enviado o status novo a ser atribuído ao pedido.

  ***Endpoint:*** `localhost:3333/orders/:order_id`

  ***Corpo da requisição:***
  ```json
  {
  	"status": "approved"
  }
  ```

<br><br>

### Favoritos
Este recurso permite gerenciar os pratos favoritos do usuário, sendo assim é um recurso restrito a usuários comuns. Adicione `/favorites` ao final da URL para acessar 
as funcionalidades adicionar, listar e remover.

- #### Adicionar aos favoritos (POST) ![Static Badge](https://img.shields.io/badge/user-339900)
  Adiciona um item do menu aos favoritos do usuário logado. Substitua o `/menu_item_id` passado como parâmetro na URL abaixo pelo ID do prato a ser adicionado aos favoritos.

  ***Endpoint:*** `localhost:3333/favorites/:menu_item_id`

  ***Corpo da requisição:***
  > Não é necessário enviar nenhum conteúdo no corpo da requisição. Apenas a URL e os parâmetros de consulta (se houver) são utilizados.

  *Essa funcionalidade somente retorna o ID do favorito na aba preview.*
  
<br>
  
- #### Listar favoritos (GET) ![Static Badge](https://img.shields.io/badge/user-339900)
  Exibe todos os pratos favoritos do usuário logado.

  ***Endpoint:*** `localhost:3333/favorites`

  ***Corpo da requisição:***
  > Não é necessário enviar nenhum conteúdo no corpo da requisição. Apenas a URL e os parâmetros de consulta (se houver) são utilizados.

  Exemplo de resposta esperada:
  ```json
  [
  	{
  		"id": 1,
  		"menu_item_id": 4,
  		"menu_item_name": "Prato exemplo",
  		"menu_item_image": "60297f1f8b8f7633dc38-espresso.png"
  	}
  ]
  ```

 <br>
  
- #### Remover favorito (DELETE) ![Static Badge](https://img.shields.io/badge/user-339900)
  Remove um prato específico dos favoritos do usuário. Substitua o `/menu_item_id` passado como parâmetro na URL abaixo pelo ID do prato a ser removido dos favoritos.

  ***Endpoint:*** `localhost:3333/favorites/:menu_item_id`

  ***Corpo da requisição:***
  > Não é necessário enviar nenhum conteúdo no corpo da requisição. Apenas a URL e os parâmetros de consulta (se houver) são utilizados.

  *Essa funcionalidade não possui nenhum conteúdo de resposta, somente a confirmação na aba preview.*

### Imagens
Para visualizar a imagem de um prato específico é possível utilizar o endpoint abaixo, como parâmetro passamos o nome da imagem registrada no prato, o nome da imagem pode 
ser obtido através da listagem de pratos.

***Endpoint:*** `localhost:3333/files/nome_da_imagem_do_prato.png`

***Corpo da requisição:***
> Não é necessário enviar nenhum conteúdo no corpo da requisição. Apenas a URL e os parâmetros de consulta (se houver) são utilizados.

*Ao executar receberemos a imagem atribuída ao prato na aba preview.*

<br><br>

Projeto criado por [Rocketseat](https://github.com/Rocketseat) e desenvolvido por [Daiane&nbsp;Araújo](https://github.com/araujodai).


