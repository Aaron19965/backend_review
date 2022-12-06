import coolsms from "coolsms-node-sdk";
const mysms = coolsms.default;

export function checkPhone(myphone) {
  // 조건이 맞지않다면 false를 리턴해줘
  if (myphone.length !== 10 && myphone.length !== 11) {
    console.log("핸드폰 번호를 제대로 입력해주세요.");
    return false;
  } else {
    return true;
  }
}

export function getToken() {
  const count = 6;
  if (count === undefined) {
    console.log("error 발생, 갯수를 제대로 입력해주세요.");
    return;
  }

  if (count < 2) {
    console.log("error 발생, 갯수가 너무 적습니다.");
    return;
  }

  if (count >= 10) {
    console.log("error 발생, 갯수가 너무 큽니다.");
    return;
  }

  const result = String(Math.floor(Math.random() * 10 ** count)).padStart(
    count,
    "0"
  );
  return result;
}

export async function sendTokenToSMS(myphone, result) {
  const SMS_KEY = process.env.SMS_KEY;
  const SMS_SECRET = process.env.SMS_SECRET;
  const SENDER = process.env.SENDER;

  const messageService = new mysms(SMS_KEY, SMS_SECRET);

  const response = await messageService.sendOne({
    to: myphone,
    from: SENDER,
    text: `[코드캠프] sms자동전송 - 인증번호는 [${result}] 입니다.`,
  });

  console.log(response);

  // console.log(myphone + "번호로 인증번호" + result + "를 전송합니다.");
  // 템플릿리터럴
  // console.log(`${myphone}번호로 인증번호${result}를 전송합니다.`);
}
