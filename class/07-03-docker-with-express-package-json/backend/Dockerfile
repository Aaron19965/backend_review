# node가 설치되어있는 리눅스 컴퓨터 한대 만들기
FROM node:14

# 명령어를 실행할 작업 폴더 위치 지정
WORKDIR /myfolder/
# 모든 소스 코드를 복사하기 전에 먼저, packge.json과 yarn.lock을 복사하게함
COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/
# 그 후에 모듈들을 설치
RUN yarn install

# 그러고 모든 소스코드를 복사해 도커 컴퓨터에 넣어주기
COPY . /myfolder/

#  package.json 파일을 확인하고 실행 명령어를 입력해서 서버 실행
CMD yarn dev