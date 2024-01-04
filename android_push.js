//用于钩取 com.igexin.sdk.PushManager 类的 initialize() 方法，在方法执行时打印堆栈信息。
function showStacks() {
    var Exception = Java.use("java.lang.Exception");
    var ins = Exception.$new("Exception");
    var straces = ins.getStackTrace();
    if (undefined == straces || null == straces) {
        return;
    }
    console.log("---------------- Stack strat ----------------");
    console.log("");
    for (var i = 0; i < straces.length; i++) {
        var str = "   " + straces[i].toString();
        console.log(str);
    }
    console.log("");
    console.log("---------------- Stack end----------------\r\n");
    Exception.$dispose();
}

function hookInitGeTuiPush() {
    var igexin = Java.use("com.igexin.sdk.PushManager");
    igexin.initialize.overload("android.content.Context").implementation = function (context) {
        this.initialize(context);
        console.log("调用个推push初始化方法");
        showStacks();
    }
}


Java.perform(function () {
   hookInitGeTuiPush();
});