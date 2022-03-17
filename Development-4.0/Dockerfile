FROM fusuf/whatsasena:latest

RUN git clone https://github.com/Zenoixnoize/GARFIELD-4.0 /root/WhatsAsenaDuplicated
WORKDIR /root/WhatsAsenaDuplicated/
RUN git clone https://github.com/zenoixnoize/uploads
ENV TZ=Asia/Colombo
RUN npm install supervisor -g
RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies
RUN npm install

CMD ["node", "bot.js"]
