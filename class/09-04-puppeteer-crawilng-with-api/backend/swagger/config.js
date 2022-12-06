export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "나만의 미니프로젝트 API 명세서",
      version: "1.0.0",
    },
  },
  // *.swagger.js 은 swagger 폴더 안에 있는 .swagger.js로 끝나는 모든 파일을 연결
  apis: ["./swagger/*.swagger.js"], // files containing annotations as above
};
