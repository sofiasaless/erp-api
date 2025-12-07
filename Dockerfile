# Estágio 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package.json e instalar dependências
COPY package*.json ./
RUN npm ci

# Copiar código e buildar
COPY . .
RUN npm run build

# Estágio 2: Produção
FROM node:18-alpine

WORKDIR /app

# Instalar apenas dependências de produção
COPY package*.json ./
RUN npm ci --only=production

# Copiar build do estágio anterior
COPY --from=builder /app/dist ./dist

# Variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["node", "dist/main"]