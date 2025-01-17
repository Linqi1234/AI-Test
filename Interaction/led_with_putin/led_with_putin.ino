#include <FastLED.h>

#define LED_PIN     6
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


void setup() {
    Serial.begin(9600);
    
    FastLED.addLeds<NEOPIXEL, LED_PIN>(leds, NUM_LEDS);
}

void loop() {
  if (Serial.available() > 0) {    // 检查是否有数据可用
    String result = Serial.readStringUntil('\n');  // 读取一行数据，直到换行符

    // 根据接收到的数据闪烁内置LED
    if (result == "true"){
                setColor(CRGB::Green);
                delay(10000);
                clearLEDs();
                
           } else if (result == "false") {
                setColor(CRGB::Red);
                delay(10000);
                clearLEDs();
                mySerial.println("false"); 
           };
            // 添加其他条件
        }
   }

    



