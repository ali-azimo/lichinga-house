FROM node:20-alpine

WORKDIR /app

# Copiar apenas os arquivos de configuração primeiro
COPY api/package*.json ./api/
COPY client/package*.json ./client/

# Instalar dependências
RUN cd api && npm ci --only=production
RUN cd client && npm ci

# Copiar o resto do código (excluindo node_modules e dist via .dockerignore)
COPY . .

# Criar .dockerignore para garantir
RUN echo "node_modules\nclient/node_modules\ndist\nclient/dist\n.env" > .dockerignore

# Fazer o build do frontend
RUN cd client && npm run build

EXPOSE 4000

CMD ["node", "api/index.js"]