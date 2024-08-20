interface UtilVarType {
    baseUrl:string,
    code:string|number,
    noContentCode:number,
    ENC:boolean,//是否进行加密
}

const UtilVar:UtilVarType = {
    baseUrl:"",
    code:401, //登陆过期
    noContentCode:204, //请求成功但没有内容
    ENC:false,

}
const runtimeType:any = {

    production: () => {

    },
    //开发环境
    development: () => {
        // UtilVar.baseUrl= `http://www.xihuanmantou.cn:19527`

    },
    hash:()=>{

    }
    
}
// console.log(import.meta.env)
runtimeType[import.meta.env.MODE]&&runtimeType[import.meta.env.MODE]()
export default UtilVar