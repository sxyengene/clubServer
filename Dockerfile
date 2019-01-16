FROM sxyengene/centos7node10

WORKDIR /var/www/html/

COPY ./src/package.json /tmp/npmpkgs/
COPY ./src/package-lock.json /tmp/npmpkgs/
COPY ./src/.travis.yml /tmp/npmpkgs/
COPY ./src/appveyor.yml /tmp/npmpkgs/
COPY ./src/.autod.conf.js /tmp/npmpkgs/

RUN cd /tmp/npmpkgs/ && npm install -S

RUN git clone https://github.com/sxyengene/clubServer.git && \
	cd /var/www/html/clubServer/src/ && ln -s /tmp/npmpkgs/node_moduels ./ 

EXPOSE 7001
