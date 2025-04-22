FROM node:20-alpine

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos de configuração antes
COPY package*.json ./
COPY tsconfig.json ./
COPY .env .env

# Instalar dependências
RUN npm install

# Copiar código do projeto e schema do Prisma
COPY prisma ./prisma
COPY src ./src

# Gerar o client do Prisma
RUN npx prisma generate

# Expor a porta
EXPOSE 3333

# Comando para rodar
CMD ["npx", "tsx", "src/server.ts"]
