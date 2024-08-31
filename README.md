# MAKER CLI

Este é um projeto básico para criação de páginas, componentes e contextos para o ReactJS. Ele suporta:

- Next.JS (App Router e pages);
- React.JS puro.

## Como usar

1. Instale o pacote
```
npm install makerjs
```

2. Abra o terminal na pasta do projeto e crie uma página
```
maker make:page contatos 
```

3. É possível gerar o CSS module da página ou componente
```
maker make:page contatos --css
```

4. Para projetos Next.JS é possível determinar client components
```
maker make:page contatos --client
```

5. Comando completo para Next.JS com client component e folha de estilo
```
maker make:page contatos --client --css
```

