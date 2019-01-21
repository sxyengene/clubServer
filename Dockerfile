FROM sxyengene/centos7node10

WORKDIR /var/www/html/clubServer

COPY ./src/ /var/www/html/clubServer/src/
COPY ./run.sh /tmp/

#RUN git clone https://github.com/sxyengene/clubServer.git && \
#RUN	cd /var/www/html/clubServer/src/ 
#&& ln -s /tmp/npmpkgs/node_modules ./ && \
#	ln -s /tmp/npmpkgs/config.sxy.js ./config/

WORKDIR /var/www/html/clubServer/src/

ENTRYPOINT sh /tmp/run.sh
	
	

#RUN cd /var/www/html/clubServer/  && git ls-tree HEAD && git update-index --chmod=+x ** && git ls-tree HEAD
EXPOSE 7001
