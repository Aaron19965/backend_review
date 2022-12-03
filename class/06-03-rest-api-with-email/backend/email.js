import { getToday } from "./utils.js";
import nodemailer from "nodemailer";

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
export async function sendWelcomeTemplateToEmail(email, template) {
    const EMAIL_USER = process.env.EMAIL_USER; 
    const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD; // Google 앱 비밀번호
    const EMAIL_SENDER = process.env.EMAIL_SENDER; // 2단계 인증을 설정한 본인의 이메일

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASSWORD,
        },
    });

    const result = await transporter.sendMail({
        from: EMAIL_SENDER,
        to: email,
        subject: "[AaronProject] 가입을 축하드립니다.",
        html: template,
    });
    // 템플릿을 이메일에 전송
    console.log(result);
    // console.log(`${email}로 템플릿${template}을 전송합니다.`);
}
