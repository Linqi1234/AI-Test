/*

接线说明：
Arduino<--->HPD482 　 　     　　               　 
2<--------->MNB
3<--------->MB
4<--------->MNA
5<--------->MA
6<--------->LAT
7<--------->DI
8<--------->CLK
9<--------->STBA
10<-------->STBB
GND<------->GND（一定要接上）


*/

#include "HPD482.h"   //打印机头文件
#include "picture.h"  //待打印的图片数据
#include <FastLED.h>

#define LED_PIN     12
#define NUM_LEDS    300


CRGB leds[NUM_LEDS];


// 自定义的设置颜色的函数
void setColor(CRGB color) {
  for (int i = 0; i < NUM_LEDS; i++) {
    leds[i] = color;             // 设置每个LED的颜色
  }
  FastLED.show();                // 更新LED显示
}

// 自定义的清除LED的函数
void clearLEDs() {
  for (int i = 0; i < NUM_LEDS; i++) {
    leds[i] = CRGB::Black;       // 将LED设置为黑色（关闭状态）
  }
  FastLED.show();                // 更新LED显示
}




HPD482 printer = HPD482();  //实例化打印机模块

void setup() {
  pinMode(13, OUTPUT);  //LED
  Serial.begin(9600);
  FastLED.addLeds<NEOPIXEL, LED_PIN>(leds, NUM_LEDS);


  //*********************以下部分调用打印函数开始打印**********************************//

  printer.Print_SetDeep(8);   //设置打印颜色深度（用于修改打印颜色深度，不需要每次都设置，初始化里已有，此句可不要）
  printer.Print_Lines(1, 8);  //打印5条虚线，虚线间距2mm
  printer.Motor_Run(80, 0);   //步进电机旋转进纸24/8=3mm

    printer.Print_Stop();

/*

  printer.Print_Img2Lcd(0, (u8*)Image, 1);  //在坐标0位置打印图片

  printer.Print_String_big((u8*)"      Welcome to", 16, 27, 13);            //打印36号英文字符串
  printer.Print_String_big((u8*)" Asylum Application Centre", 28, 27, 13);  //打印36号英文字符串

  printer.Print_String_big(String(String(" ") + String(12345)).c_str(), 6, 96, 48);  //打印103号数字

  printer.Print_String_big((u8*)" Asylum seekers", 14, 34, 17);  //打印36号英文字符串

  printer.Print_String_big((u8*)"    Please Note Tickets may be called", 37, 18, 9);  //打印12号英文字符串
  printer.Print_String_big((u8*)"    out of sequence", 19, 18, 9);                    //打印12号英文字符串
*/







  //printer.Print_SStr((u8*)"HPD482 test.YOU LI diy",12,6);//打印12号英文字符串
  //printer.Print_SStr((u8*)"HPD482 test.YOU LI diy",16,8);//打印16号英文字符串
  //printer.Print_SStr((u8*)"HPD482 test.YOU LI diy",24,16);//打印24号英文字符串
  //printer.Print_Img2Lcd(0,(u8*)Image,1);//在坐标0位置打印图片
  //printer.Print_Img2Lcd(20,(u8*)Image,1);//在坐标为20位置打印图片
  // printer.Print_Img2Lcd(44,(u8*)Image,1);//在坐标为44位置打印图片（超出打印范围部分会被裁掉）

  //************************************打印结束**************************************//

  //printer.Print_Img2Lcd(0,(u8*)Image,1);//在坐标0位置打印图片
}
bool flag_one = false;
long display_num = 127877;


/*
文字：Attention!
User Test Results Non-human
Please note the observation
WARING!
WARING!
WARING!

*/
void loop() {
 if (Serial.available() > 0) {    // 检查是否有数据可用
    String result = Serial.readStringUntil('\n');  // 读取一行数据，直到换行符

    // 根据接收到的数据闪烁内置LED
    if (result == "true"){
        
   setColor(CRGB::Green);
                delay(1000);       
    printer.Print_SStr((u8*)"  Access Confirmation",24,16);//打印12号英文字符串
  printer.Print_SStr((u8*)"   ",24,16);

   printer.Print_Img2Lcd(12,(u8*)Image,1);
     printer.Print_SStr((u8*)"   ",24,16);
  printer.Print_SStr((u8*)"   ",24,16);

 

  printer.Print_SStr((u8*)"    Congratulations",24,16);//打印12号英文字符串
  printer.Print_SStr((u8*)"   ",24,16);
  printer.Print_SStr((u8*)"   ",24,16);

  printer.Print_SStr((u8*)"  you successfully pass  ",24,16);//打印12号英文字符串
  printer.Print_SStr((u8*)"   ",24,16);

  printer.Print_SStr((u8*)"  the competency test",24,16);//打印12号英文字符串
  printer.Print_SStr((u8*)"   ",24,16);

  printer.Print_SStr((u8*)"    You are a human",24,16);//打印12号英文字符串
  printer.Print_SStr((u8*)"   ",24,16);

  printer.Print_SStr((u8*)"  and have been granted ",24,16);//打印12号英文字符
  printer.Print_SStr((u8*)"   ",24,16);

  printer.Print_SStr((u8*)"   access to this area ",24,16);//打印12号英文字符
  printer.Print_SStr((u8*)"   ",24,16);


  printer.Print_SStr((u8*)"   ",24,16);
  printer.Print_SStr((u8*)"   ",24,16);
  printer.Print_SStr((u8*)"   ",24,16);
  printer.Print_SStr((u8*)"   ",24,16);
  printer.Print_SStr((u8*)"   ",24,16);
  printer.Print_SStr((u8*)"   ",24,16);

  printer.Print_Lines(1, 8);
  printer.Print_SStr((u8*)"   ",24,16);
  printer.Print_SStr((u8*)"   ",24,16);
  printer.Print_SStr((u8*)"   ",24,16);
  printer.Print_SStr((u8*)"   ",24,16);
 

                clearLEDs();
                
    }
     else if (result == "false") {
              
 setColor(CRGB::Red);
                delay(1000);
     printer.Print_SStr((u8*)".  Rejection Notice",24,16);//打印12号英文字符串
  printer.Print_SStr((u8*)"   ",24,16);

printer.Print_Img2Lcd(12,(u8*)Image,1);
  printer.Print_SStr((u8*)"   ",24,16);
  printer.Print_SStr((u8*)"   ",24,16);


  printer.Print_SStr((u8*)" Test Results Non-human",24,16);//打印12号英文字符串
  printer.Print_SStr((u8*)"   ",24,16);

  printer.Print_SStr((u8*)"     Denied entry",24,16);//打印12号英文字符串
  printer.Print_SStr((u8*)"   ",24,16);

  printer.Print_SStr((u8*)"  Keeping observation",24,16);//打印12号英文字符串
  printer.Print_SStr((u8*)"   ",24,16);

  printer.Print_SStr((u8*)"        WARING!",24,16);//打印12号英文字符串
  printer.Print_SStr((u8*)"   ",24,16);

  printer.Print_SStr((u8*)"        WARING!",24,16);//打印12号英文字符串
  printer.Print_SStr((u8*)"   ",24,16);

  printer.Print_SStr((u8*)"        WARING!",24,16);//打印12号英文字符
  printer.Print_SStr((u8*)"   ",24,16);

   printer.Print_SStr((u8*)"  Wait for Security",24,16);//打印12号英文字符串
  printer.Print_SStr((u8*)"   ",24,16);


  printer.Print_SStr((u8*)"   ",24,16);
  printer.Print_SStr((u8*)"   ",24,16);
  printer.Print_SStr((u8*)"   ",24,16);
  printer.Print_SStr((u8*)"   ",24,16);
  printer.Print_SStr((u8*)"   ",24,16);
  printer.Print_SStr((u8*)"   ",24,16);

  printer.Print_Lines(1, 8);
  printer.Print_SStr((u8*)"   ",24,16);
  printer.Print_SStr((u8*)"   ",24,16);
  printer.Print_SStr((u8*)"   ",24,16);
  printer.Print_SStr((u8*)"   ",24,16);

 
 
                clearLEDs();
                
   }
  }
};