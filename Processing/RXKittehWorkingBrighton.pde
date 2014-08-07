
import processing.serial.*;

Serial myPort;  // Create object from Serial class
int val;      // Data received from the serial port
int a;
color c = color(59, 253, 252);

void setup() 
{
  size(200, 200);
 
  String portName = Serial.list()[0];          //Teensy 3.1 is on port 10
  myPort = new Serial(this, portName, 9600);
}

void draw()
{
  if ( myPort.available() > 0) {  // If data is available,
    val = myPort.read();         // read it and store it in val
  }
  
  
  background(200);             // Set background to white
  

  if (val == 1) {              // If the serial value is 1 (a PAT)
   background(0, 10,20);
 fill(c);
 rect(0, 0, 100, 100);
  } 

  if(val > 2) {                       // If the serial value is not 0,
     background(100, 0,0);
    fill(val);                 // the time elapsed during the PET will pass in as int "val" 
    rect(50, 50, val, val);
  }
  
}



