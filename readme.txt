准备：1台已经root的安卓手机

1.下载frida-server
到frida官网https://github.com/frida/frida/releases下载对应版本把frida-server服务放到手机中
注意：这里需要根据自己手机的cpu架构选择对应的版本
电脑链接手机，查看手机cpu架构命令：
adb shell getprop ro.product.cpu.abi


2.安装到手机，并启动手机frida服务
解压上面下载的文件，重命名为frida-server,然后 push 到手机 /data/local/tmp，接着启动 firda-server 服务
$ adb root
$ adb push frida-server /data/local/tmp

$ adb shell
$ su
$ cd /data/local/tmp
$ chmod 777 /data/local/tmp/frida-server
$ ./frida-server


3.运行androidhook.py，开始hook