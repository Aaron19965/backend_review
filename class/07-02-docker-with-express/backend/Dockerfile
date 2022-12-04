# node가 설치되어있는 리눅스 컴퓨터 한대 만들기
FROM node:14

# 명령어를 실행할 작업 폴더 위치 지정
WORKDIR /myfolder/
# 모든 소스코드를 복사해 도커 컴퓨터에 넣어주기
COPY . /myfolder/

#  로컬 : 각자의 컴퓨터 환경에서 설치된 node_modules 폴더로 모듈 관리
# 컨테이너 : 가상컴퓨터에서는 서로 다른 환경에 간섭 받지 않도록 모듈을 설치함
RUN yarn install
#  package.json 파일을 확인하고 실행 명령어를 입력해서 서버 실행
CMD yarn dev