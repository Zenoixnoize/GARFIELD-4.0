FROM fusuf/whatsasena:latest

RUN git clone https://github.com/Zenoixnoize/GARFIELD-4.0 /root/WhatsAsenaDuplicated
WORKDIR /root/WhatsAsenaDuplicated/
WORKDIR /root/Utils/
RUN git clone https://github.com/zenoixnoize/uploads
RUN cp -R /root/Utils/* /root/WhatsAsenaDuplicated
ENV TZ=Asia/Colombo
RUN npm install supervisor -g
RUN apt -y update && apt -y upgrade && apt -y install ffmpeg neofetch git imagemagick python graphicsmagick tesseract-ocr-all sudo npm libreoffice yarn curl && curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && sudo apt install -y nodejs && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - && echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list && apt -y update && apt -y install yarn && apt autoremove -y && rm -rf /var/lib/apt/lists/*
RUN yarn install --no-audit
CMD["bash"]

CMD ["node", "bot.js"]
