FROM fusuf/whatsasena:latest

RUN git clone https://github.com/Zenoixnoize/GARFIELD-4.0 /root/WhatsAsenaDuplicated
WORKDIR /root/WhatsAsenaDuplicated/
ENV TZ=Asia/Colombo
RUN npm install supervisor -g
RUN yarn install --no-audit
RUN git clone https://github.com/zenoixnoize/uploads

CMD ["node", "bot.js"]
