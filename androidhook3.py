# Created by shixiangyu on 2021/10/20.
import frida
import sys

packageName = 'com.wonderfull.mobileshop'

# 接收脚本信息的回调函数
# message是一个对象，type属性为send则表示send函数发送的信息，其内容在payload里
# 下面这个on_message函数可以做固定用法，一般无需改动，当然也可直接打印message看看里边的内容
def on_message(message, data):
    if message['type'] == 'send':
        print(message['payload'])
    elif message['type'] == 'error':
        print(message['stack'])

device = frida.get_usb_device()
pid = device.spawn([packageName])
# 加载进程号
process = device.attach(pid)
print(process)
process.enable_debugger()

# 加载js脚本
with open("android_main.js") as f:
    script = process.create_script(f.read())

# 应该是设置message事件的回调函数
script.on('message', on_message)
# 加载hook脚本
script.load()
#重启app
device.resume(pid)
# 保持主线程不结束（也可以使用time.sleep循环）
sys.stdin.read()
