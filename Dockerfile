FROM node:16 as build-stage
LABEL logame-manager.version="1.0.0"
LABEL maintainer="Officecom"
LABEL logame-manager.release-date="2023-10-25"

ARG ENV_CONFIGURATION=dev
ENV TZ=America/Sao_Paulo

RUN date \
  && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
  && echo $TZ > /etc/timezone

# Faz da pasta 'src' o diretório atual de trabalho
WORKDIR /src

# Copia os arquivos 'package.json' e 'package-lock.json' (se disponível)
COPY package*.json ./

# Instala dependências do projeto
RUN npm install

# Copia arquivos e pastas para o diretório atual de trabalho (pasta 'src')
COPY . .

# Compila a aplicação de produção com minificação
RUN npm run build:$ENV_CONFIGURATION

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /src/dist /usr/share/nginx/html

# Ajusta as permissões
RUN chown -Rf nginx:nginx /usr/share/nginx/html

# Instala dependencias (bash)
RUN apk add --no-cache \
    bash \
    nano

# Sobreescreve as configurações padrões do nginx
COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
