# MAKER CLI

Este é um projeto básico para criação de páginas, componentes e contextos para o ReactJS. Ele suporta:

- Next.JS (App Router e pages);
- React.JS puro.

## Características
- Criar componente para Next.JS com ou sem `use client` (Next pages ou App Router)
- Criar componentes para React.JS facilmente
- Opção para gerar CSS module
- Crie um React contexts com um comando simples

## Como usar

1. Instale o pacote
```
npm i -g makerjs-dev
```

2. Abra o terminal na pasta do projeto e crie uma página
```
npx maker make:page contatos 
```

3. É possível gerar o CSS module da página ou componente
```
npx maker make:page contatos --css
```

4. Para projetos Next.JS é possível determinar client components
```
npx maker make:page contatos --client
```

5. Comando completo para Next.JS com client component e folha de estilo
```
npx maker make:page contatos --client --css
```

## criar React context
```
npx maker make:context <name>
```

Você pode alterar a política de segurança para execução de scripts:

1. Abra o PowerShell como administrador e execute:
```
Set-ExecutionPolicy RemoteSigned
```


Acesse o projeto no github: https://github.com/dev-ansu/makerjs-dev