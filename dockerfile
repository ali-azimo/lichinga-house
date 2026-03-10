# Usa uma imagem oficial do Node.js
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência primeiro (otimiza o cache do Docker)
COPY api/package*.json ./api/
COPY client/package*.json ./client/

# Instala as dependências do backend e do frontend
RUN cd api && npm ci --only=production
RUN cd client && npm ci && npm run build

# Copia o resto do código
COPY . .

# Expõe a porta que seu servidor usa (ex: 3000)
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "api/index.js"]