function getWelcomeTemplate(name, age, school, createdAt) {
    return `
          <html>
              <body>
                  <h1>${name}님 가입을 환영합니다.</h1>
                  <hr />
                  <div>이름: ${name}</div>
                  <div>나이: ${age}살</div>
                  <div>학교: ${school}</div>
                  <div>가입일: ${createdAt}</div>
              </body>
          </html>
      `;
}

const myName = "코난";
const myAge = 8;
const mySchool = "청솔초등학교";
const myCreatedAt = "2022-11-30";

const result = getWelcomeTemplate(myName, myAge, mySchool, myCreatedAt);
console.log(result);


