FROM fusuf/whatsasena:latest

RUN git clone https://github.com/Zenoixnoize/GARFIELD-4.0 /root/WhatsAsenaDuplicate
WORKDIR /root/WhatsAsenaDuplicated/
ENV TZ=Asia/Colombo
RUN yarn install --no-audit
RUN npm install supervisor -g
RUN git clone https://github.com/Zenoixnoize/uploads
RUN cp -R /root/Utils/* /root/WhatsAsenaDuplicated 
CMD ["node", "bot.js"]
