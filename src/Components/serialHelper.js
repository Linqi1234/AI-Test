
let port = null;
let writer = null;

// 初始化串口连接
export async function initializeSerialConnection() {
  try {
    console.log("Attempting to request port...");
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
    writer = port.writable.getWriter();
    console.log("Port opened with baud rate 9600");
  } catch (error) {
    console.error("Error opening serial port:", error);
  }
}

// 发送数据到串口
export async function sendResultToArduino(isHuman) {
  if (!writer) {
    console.error("Serial writer not available");
    return;
  }

  try {
    const result = isHuman ? "true" : "false";
    const data = new TextEncoder().encode(result + '\n');
    await writer.write(data);
    console.log("Data sent to Arduino:", result);
  } catch (error) {
    console.error("Error sending result to Arduino:", error);
  }
}

// 关闭串口连接
export async function closeSerialConnection() {
  try {
    if (writer) {
      await writer.releaseLock();
      writer = null;
    }
    if (port) {
      await port.close();
      port = null;
      console.log("Port closed successfully");
    }
  } catch (error) {
    console.error("Error closing serial port:", error);
  }
}