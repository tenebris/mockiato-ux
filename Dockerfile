FROM nginx
## FIXME (otter): this needs to be tested and added before image will work with Angular7
## TODO: COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/mockiato-ux /usr/share/nginx/html
