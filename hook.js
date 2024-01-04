if (Java.available) {
    Java.perform(function () {
        var mainTabView = Java.use('com.wonderfull.mobileshop.biz.homepage.widget.MainTabsView');
        // 重载找到指定的函数
        mainTabView.OnTabSelected.overload('int','int','boolean').implementation = function (a,b,c) {
            //修改结果
            send("HOOK成功！");
            this.OnTabSelected(3,0,false);
        };
    });
}

/**
 * hook 构造方法
 */

function hookInitMethod(){
    Java.perform(function (){
        // hook 构造方法 $init
        var MoneyClass = Java.use("com.kevin.app.Money");
        MoneyClass.$init.overload().implementation = function(){
            console.log("hook Money $init");
            this.$init();
        }
    })
}


/**
 * hook 内部类
 */
function hookInnerClass(){
    Java.perfor(function(){
        // hook 内部类
        // 内部类使用$进行分隔 不使用.
        var InnerClass = Java.use("com.xiaojianbang.app.Money$innerClass");
        // 重写内部类的 $init 方法
        InnerClass.$init.overload("java.lang.String","int").implementation = function(x,y){
            console.log("x: ",x);
            console.log("y: ",y);
            this.$init(x,y);
        }
    })
}


// 接口, 抽象类, 不可以被new
// 接口, 抽象类 要使用必须要实例化, 实例化不是通过new, 而是通过实现接口方法, 继承抽象类等方式
// new __接口__{} 可以理解成 new 了一个实现接口的匿名类, 在匿名类的内部(花括号内),实现了这个接口

function hookNiMingClass(){
    Java.perform(function(){
        // hook 匿名类
        // 匿名类在 smail中以 $1, $2 等方式存在, 需要通过 java 行号去 smail 找到准确的匿名类名称
        var NiMingClass = Java.use("com.xiaojianbang.app.MainActivity$1");
        NiMingClass.getInfo.implementation = function (){
            return "kevin change 匿名类";
        }
    })
}

/**
 * hook 动静态成员属性
 */

function main(){
    Java.perform(function(){
        var MoneyClass = Java.use("com.xiaojianbang.app.Money");

        // get static properties
        // need to use .value
        var ori_property = MoneyClass.flag.value;
        console.log("ori_property: ", ori_property);

        // change static properties
        MoneyClass.flag.value = "change the value";
        console.log("change to : ", MoneyClass.flag.value);

        // get dynamic properties
        Java.choose("com.xiaojianbang.app.Money",{
            onMatch: function(instance){
                instance.num.value = 50000;
                // 当对象的成员属性和成员方法名重复时,成员属性前加`_`,进行区分
                instance._name.value = "ouyuan";
                console.log(instance._name.value, instance.num.value, instance.flag.value);
            },

            onComplete: function(){
                console.log("complete!!")
            }
        })
    })
}


