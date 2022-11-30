import { getToday } from "./utils.js";

// 이메일 검증
export function checkValidationEmail(email) {
    // email에 입력된 값이 undefined이거나, @가 없다면(이메일 형식이 아니라면)
    if (email === undefined || !email.includes("@")) {
        // false 리턴
        console.log("잘못된 이메일 형식입니다.");
        return false;
    }
    // 이메일 형식에 맞으면 true
    return true;
}

// 가입환영 문구
export function getWelcomeTemplate({ name, age, school }) {
    return `
        <html>
            <body>
                <h1>${name}님 가입을 환영합니다.</h1>
                <hr />
                <div>이름: ${name}</div>
                <div>나이: ${age}살</div>
                <div>학교: ${school}</div>
                <div>가입일: ${getToday()}</div>
            </body>
        </html>
    `;
}

// 이메일 전달 함수
export function sendWelcomeTemplateToEmail(email, template) {
    // 템플릿을 이메일에 전송
    console.log(`${email}로 템플릿${template}을 전송합니다.`);
}
