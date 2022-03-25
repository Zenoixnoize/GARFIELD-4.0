FROM quay.io/lyfe00011/test:beta

RUN git clone https://github.com/Zenoixnoize/GARFIELD-4.0 /root/GARFIELD-6.0
WORKDIR /root/GARFIELD-6.0/
ENV TZ=Asia/Colombo
RUN npm install supervisor -g
RUN yarn install --no-audit
RUN git clone https://github.com/Zenoixnoize/uploads
RUN cp -R /root/Utils/* /root/WhatsAsenaDuplicated

CMD ["node", "bot.js"]
