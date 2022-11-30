import { checkValidationEmail, getWelcomeTemplate, sendWelcomeTemplateToEmail } from "./email.js";

// 회원가입 환영 이메일 함수
function createUser({ name, age, school, email }) {
    // 1. 이메일 형식이 맞는지 확인 - 그 결과를 isValid 변수에 저장
    const isValid = checkValidationEmail(email);

    // 1번이 true라면,
    if (isValid) {
        // 2. 가입환영문구 만들기 실행 - 그 결과를 template에 저장
        const template = getWelcomeTemplate({ name, age, school });

        // 3. 이메일로 가입환영문구 보내주기
        sendWelcomeTemplateToEmail(email, template);
    }
}

// 입력 정보
const name = "코난";
const age = 8;
const school = "청솔초등학교";
const email = "a@a.com";

// api 실행 - 구조분해할당으로
createUser({ name, age, school, email });
