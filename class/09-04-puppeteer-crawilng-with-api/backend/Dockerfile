FROM node:14

WORKDIR /myfolder/ 
COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/
RUN yarn install

# RUN mkdir myfolder => myfolder가 없으면 COPY할 때, 어차피 자동으로 만들어짐
COPY . /myfolder/

# 실행명령들
CMD yarn dev