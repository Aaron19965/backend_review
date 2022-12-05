// board.model.js

// mongoose 라이브러리 불러오기
import mongoose from "mongoose";

// 새로운 스키마를 BoardSchema 변수에 담아서 선언
const BoardSchema = new mongoose.Schema({
    // 요소들의 key 값의 타입을 지정
    writer: String,
    title: String,
    contents: String,
});

// model() 메소드를 사용하여 문자열과 schema를 전달하여 model을 생성
// 첫번째 인자는 해당 collection의 단수적 표현을 나타내는 문자열
// 생성된 model을 외부에서 접근할 수 있도록 export해줌
export const Board = mongoose.model("Board", BoardSchema);
