import { getToday } from "./utils.js";
import nodemailer from "nodemailer";

export function checkEmail(myemail) {
  if (myemail === undefined || myemail.includes("@") === false) {
    console.log("에러 발생!!! 이메일 주소를 제대로 입력해 주세요!!!");
    return false;
  } else {
    return true;
  }
}

export function getWelcomeTemplate({ name, age, school }) {
  // const {age, createdAt} = { name, age, school, createdAt }

  const mytemplate = `
          <html>
              <body>
                  <div style='display: flex; flex-direction: column; align-items: center;'>
                    <div style='width: 500px;'>
                      <h1>${name}님 가입을 환영합니다!!!</h1>
                      <hr />
                      <div style='color:blue'>이름: ${name}</div>
                      <div>나이: ${age}</div>
                      <div>학교: ${school}</div>
                      <div>가입일: ${getToday()}</div>
                    </div>
              </body>
          </html>
      `;
  return mytemplate;
  // console.log(mytemplate)
}

export async function sendTemplateToEmail(myemail, result) {
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASS = process.env.EMAIL_PASS;
  const EMAIL_SENDER = process.env.EMAIL_SENDER;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const response = await transporter.sendMail({
    // 발신자 이메일
    from: EMAIL_SENDER,
    // 누구에게 - 회원가입된 이메일
    to: myemail,
    // 제목
    subject: "[코드캠프] 가입을 축하합니다.",
    // 본문
    html: result,
  });
  console.log(response);

  // console.log(
  //   myemail + "이메일로 가입환영템플릿 " + result + "를 전송합니다!!!"
  // );
}
