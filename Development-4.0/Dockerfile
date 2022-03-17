FROM Zenoixnoize/GARFIELD_4.0:latest

RUN git clone https://github.com/Zenoixnoize/GARFIELD-4.0 /root/WhatsAsenaDuplicated
WORKDIR /root/WhatsAsenaDuplicated/
WORKDIR /root/Utils
ENV TZ=Asia/Colombo
RUN npm install supervisor -g
RUN yarn install --no-audit
RUN cp -R /root/Utils/* /root/WhatsAsenaDuplicated

CMD ["node", "bot.js"]
