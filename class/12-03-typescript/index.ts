// String Type

// 문자타입 - 타입추론
let aaa = '안녕하세요.'
aaa = '반갑습니다.'
// aaa = 3 // 📍 다른 타입을 넣게되면 에러 발생

// 문자타입 - 타입명시
let bbb: string = '반갑습니다.'
bbb = '안녕하세요.'
// bbb = 123 // 📍 숫자 타입 불가능

// 타입 명시가 필요한 상황
let ccc: string | number = '반갑습니다.'
ccc = 10
ccc = '안녕하세요'

// 숫자타입
let ddd: number = 10
// ddd = '안녕하세요' // 📍 문자 타입 불가능
// ddd = '33' // 📍 문자 타입 불가능

// 불린타입
let eee: boolean = true
// eee = 11 // 📍 숫자 타입 불가능
eee = false
// eee = 'false' // 📍 문자 타입 불가능

// 배열 타입
let arr: number[] = [1, 2, 3]
// arr = ["123", 2, 3] // 📍 문자 타입 불가능

let arr2: Array<number> = [1, 2, 3] // 제네릭도 사용가능

// 숫자로만 이루어진 배열만 가능
let fff: number[] = [1, 2, 3]
// fff = ["철수", "영희", "훈이"] // 📍 문자 타입 불가능

// 문자로만 이루어진 배열만 가능
let ggg: string[] = ["철수", "영희", "훈이"]

// 숫자와 문자가 들어간 배열이면 가능
let hhh: (number | string)[] = [1, "철수", 2, "영희"]

// 숫자로만 이루어진 배열이거나 문자로만 이루어진 배열이면 가능
let money: number[] | string[] = [1000, 2000, 3000]
money = ["1000원", "2000원", "3000원"]
// money = [1000, "2000원"] // 📍 숫자와 문자가 섞여있는 배열은 불가능

// 객체타입
interface IProfile {
    name: string
    age: number | string
    school: string
    hobby?: string
}

let profile: IProfile = {
    name: '철수',
    age: 8,
    school: '다람쥐초등학교'
}
profile.age = '8살'

profile.hobby = '수영'

// 함수타입 1
function add(a: number, b: number): number {
    return a + b
    // return '안녕하세요' // 📍 return 값이 문자 타입이기에 불가능
}

const result = add(1, 2)

// 함수타입 2
function add2(a:number, b:number): string {
    return '안녕하세요'
    // return a + b // 📍 return 값이 숫자 타입이기에 불가능
}

const result2 = add(1, 2) // result의 타입은 string이 되는 것

