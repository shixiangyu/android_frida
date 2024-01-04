/**
 * Created by shixiangyu on 2021/10/20.
 * 检测是否调用指定api，可用于隐私检测
 */

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

function hookGetSystemInfo() {
    var SP = Java.use("android.os.SystemProperties");
    SP.get.overload('java.lang.String').implementation = function (p1) {
        showStacks()
        var tmp = this.get(p1);
        console.log("[*]" + p1 + " : " + tmp);
        return tmp;
    }
    SP.get.overload('java.lang.String', 'java.lang.String').implementation = function (p1, p2) {
        showStacks()
        var tmp = this.get(p1, p2)
        console.log("[*]" + p1 + "," + p2 + " : " + tmp);
        return tmp;
    }
}


function hookGetAndroidId() {
    var Secure = Java.use("android.provider.Settings$Secure");
    Secure.getString.implementation = function (p1, p2) {
        if (p2.indexOf("android_id") < 0) return this.getString(p1, p2);
        console.log("========================== Called - get android_ID ==========================param is " + p2);
        var temp = this.getString(p1, p2);
        console.log("get android_ID: " + temp);
        showStacks();
        console.log("==============================================================\r\n");
        return temp;

    }
}

function hookGetIMSI() {
    var TelephonyManager = Java.use("android.telephony.TelephonyManager");
    // 获取单个IMSI的方法
    TelephonyManager.getSimSerialNumber.overload().implementation = function () {
        console.log("========================== Called - getSimSerialNumber(String)==========================");
        var temp = this.getSimSerialNumber();
        console.log("getSimSerialNumber(String): " + temp);
        showStacks();
        console.log("==============================================================\r\n");
        return temp;
    };

    // 应该也是获取IMSI的方法
    TelephonyManager.getSubscriberId.overload('int').implementation = function (p) {
        console.log("========================== Called - getSubscriberId(int) ==========================");
        var temp = this.getSubscriberId(p);
        console.log("getSubscriberId(int): " + temp);
        showStacks();
        console.log("==============================================================\r\n");
        return temp;
    };

    // 获取多个IMSI的方法
    TelephonyManager.getSimSerialNumber.overload('int').implementation = function (p) {
        console.log("========================== Called - getSimSerialNumber(int) ==========================param is" + p);
        var temp = this.getSimSerialNumber(p);
        console.log("getSimSerialNumber(int) " + temp);
        showStacks();
        console.log("==============================================================\r\n");
        return temp;
    };
}


function hookGetIMEI() {
    var TelephonyManager = Java.use("android.telephony.TelephonyManager");
    // getDeviceId was deprecated in API level 26
    //获取单个IMEI
    TelephonyManager.getDeviceId.overload().implementation = function () {
        console.log("========================== Called - getDeviceId() ==========================");
        console.log("==============================================================\r\n");
        var temp = this.getDeviceId();
        console.log("getDeviceId: " + temp);
        showStacks();
        return temp;
    };
    //获取多个IMEI的方法
    TelephonyManager.getDeviceId.overload('int').implementation = function (p) {
        console.log("========================== Called - getDeviceId() ==========================param is " + p);
        var temp = this.getDeviceId(p);
        console.log("getDeviceId " + p + ": " + temp);
        showStacks();
        console.log("==============================================================\r\n");
        return temp;
    };

    //API LEVEL26以上的获取单个IMEI方法
    TelephonyManager.getImei.overload().implementation = function () {
        console.log("========================== Called - getImei() ==========================");
        var temp = this.getImei();
        console.log("getImei: " + temp);
        showStacks();
        console.log("==============================================================\r\n");
        return temp;
    };


    // API LEVEL26以上的获取多个IMEI方法
    TelephonyManager.getImei.overload('int').implementation = function (p) {
        console.log("========================== Called - getImei() ==========================param is" + p);
        var temp = this.getImei(p);
        console.log("getImei: " + temp);
        showStacks();
        console.log("==============================================================\r\n");
        return temp;
    };
}


function hookGetMacAddress() {
    var wifiInfo = Java.use("android.net.wifi.WifiInfo");
    wifiInfo.getMacAddress.implementation = function () {
        console.log("========================== Called - getMacAddress() ==========================");
        var tmp = this.getMacAddress();
        console.log("getMacAddress: " + tmp);
        showStacks();
        console.log("==============================================================\r\n");
        return tmp;
    };

    var networkInterface = Java.use("java.net.NetworkInterface");
    networkInterface.getHardwareAddress.overload().implementation = function () {
        console.log("========================== Called - getHardwareAddress() ==========================");
        var temp = this.getHardwareAddress();
        console.log("getHardwareAddress: " + temp);
        showStacks();
        console.log("==============================================================\r\n");
        return temp;
    };
}

function hookGetRunningAppProcess(){
      var activityManager = Java.use("android.app.ActivityManager");
      activityManager.getRunningAppProcesses.implementation = function () {
        console.log("========================== Called - getRunningAppProcesses() ==========================");
        var tmp = this.getRunningAppProcesses();
        console.log("getRunningAppProcesses: " + tmp);
        showStacks();
        console.log("==============================================================\r\n");
        return tmp;
    };

}


function hookGetInstallPackages() {
    var pmPackageManager = Java.use("android.content.pm.PackageManager");
    pmPackageManager.getInstalledPackages.overload('int').implementation = function (p1) {
        console.log("========================== Called - pm-getInstalledPackages() ==========================");
        var temp = this.getInstalledPackages(p1);
        console.log("getInstalledPackages: " + temp);
        showStacks();
        console.log("==============================================================\r\n");
        return temp;
    };
    pmPackageManager.getInstalledApplications.overload('int').implementation = function (p1) {
        console.log("========================== Called - pm-getInstalledApplications() ==========================");
        var temp = this.getInstalledApplications(p1);
        console.log("getInstalledApplications: " + temp);
        showStacks();
        console.log("==============================================================\r\n");
        return temp;
    };

    var appPackageManager = Java.use("android.app.ApplicationPackageManager");
    appPackageManager.getInstalledPackages.overload('int').implementation = function (p1) {
        console.log("========================== Called - app-getInstalledPackages() ==========================");
        var temp = this.getInstalledPackages(p1);
        console.log("getInstalledPackages: " + temp);
        showStacks();
        console.log("==============================================================\r\n");
        return temp;
    };
    appPackageManager.getInstalledApplications.overload('int').implementation = function (p1) {
        console.log("========================== Called - app-getInstalledApplications() ==========================\r\n");
        var temp = this.getInstalledApplications(p1);
        console.log("getInstalledApplications: " + temp);
        showStacks();
        return temp;
    };
    appPackageManager.queryIntentActivities.implementation = function (p1, p2) {
        console.log("========================== Called - app-queryIntentActivities() ==========================\r\n");
        var temp = this.queryIntentActivities(p1, p2);
        console.log("queryIntentActivities: " + p1 + p2);
        showStacks();
        return temp;
    };

}


Java.performNow(function () {
        hookGetAndroidId();
        hookGetIMEI();
        hookGetIMSI();
        hookGetMacAddress();
        hookGetRunningAppProcess();
        hookGetInstallPackages();
    });



