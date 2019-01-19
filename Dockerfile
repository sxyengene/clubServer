FROM sxyengene/centos7node10

WORKDIR /var/www/html/

COPY ./src/node_modules /tmp/npmpkgs/node_modules
COPY ./src/config/config.sxy.js /tmp/npmpkgs/
COPY ./run.sh /tmp/
#COPY ./src/.autod.conf.js /tmp/npmpkgs/

#RUN cd /tmp/npmpkgs/ && npm install -S

RUN git clone https://github.com/sxyengene/clubServer.git && \	
	cd /var/www/html/clubServer/src/ && ln -s /tmp/npmpkgs/node_modules ./ && \
	ln -s /tmp/npmpkgs/config.sxy.js ./config/

WORKDIR /var/www/html/clubServer/src/

ENTRYPOINT sh /tmp/run.sh
	
	

#RUN cd /var/www/html/clubServer/  && git ls-tree HEAD && git update-index --chmod=+x ** && git ls-tree HEAD
EXPOSE 7001
