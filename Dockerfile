# Paso 1: Construcción (Build)
# Usamos Node 20 como pide el reto
FROM node:20-alpine AS build
WORKDIR /app

# Copiamos archivos de dependencias
COPY package*.json ./
RUN npm install

# Copiamos el resto del código y construimos la app
COPY . .
RUN npm run build -- --configuration production

# Paso 2: Servidor (Nginx)
# Usamos un servidor ligero para servir el contenido estático
FROM nginx:alpine
# IMPORTANTE: Verifica que la ruta 'dist/lifegoals/browser' coincida con tu carpeta de salida
COPY --from=build /app/dist/lifegoals/browser /usr/share/nginx/html

# Copiamos una configuración básica de Nginx para manejar rutas de Angular
RUN echo "server { listen 80; location / { root /usr/share/nginx/html; index index.html; try_files \$uri \$uri/ /index.html; } }" > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
