# RH - SATISFAÇÃO

<div style="display: flex; justify-content: center">
    <img src="public\favicon.png" alt="Logo do projeto" width="200"/>
    
</div>

## Pesquisa de clima - Kleiner

### UTILIZAÇÂO
#### PAINEL
##### Efetua **CRUDs** essênciais como **Áreas, Categorias e Perguntas**, demonstra dados em forma de **identificadores** e permite **download** da pesquisa como **Excell**.

#### FORMULÁRIO
##### Nesta aba é onde as **respostas das perguntas** são efetuadas, carregando um formulário dinâmico de acordo com os dados cadastrados no **painel**

### SUBIR SERVIÇO
#### FRONT-END
##### Após **clone** do repositório

##### Entra na **root** do projeto
```bash
cd RH---SATISFACAO
```

##### Instarla dependências
```bash
npm install
```

##### Levanta **Angular**
```bash
npm run start
```

#### BACK-END
##### No **servidor** vá até a pasta **kleiner/angular/server**
```bash
cd kleiner/angular/server
```

##### Instale **pm2** globalmente 
```bash
npm install pm2 -g
```

#### Com **pm**2 inicie o serviço do **server.js**
```bash
pm2 start server,js -name gptw-server
```

#### Após realizar os processos acima pode estar acessando o **ip** do **servidor** na porta **127.0.0.1:4280**