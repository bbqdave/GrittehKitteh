import processing.serial.*;
import spacebrew.*;
import cc.arduino.*;

Spacebrew spacebrewConnection;  // Spacebrew connection object
 
String server = "sandbox.spacebrew.cc";
String name = "KITTEH";
String description = "Testing Unity to Arduino";
 
Serial myPort;  // Create object from Serial class
int val;      // Data received from the serial port
int a;
color c = color(59, 253, 252);
 
void setup() 
{
  size(200, 200);
// 
//  String portName = Serial.list()[10];          //Teensy 3.1 is on port 10
//  myPort = new Serial(this, portName, 9600);
arduino = new Arduino(this, Arduino.list()[0], 57600);
 arduino.pinMode(led, Arduino.OUTPUT);
 arduino.pinMode(button,Arduino.INPUT);
  
  spacebrewConnection = new Spacebrew( this );
  
  // add each thing you publish to
  spacebrewConnection.addPublish( "scroll", "string",true ); 
  spacebrewConnection.addPublish( "select","string",true ); 
 // spacebrewConnection.addSubscribe("download","string",true);
  // connect to spacebrew
  spacebrewConnection.connect(server, name, description );
 
}
 
void draw()
{
  if ( myPort.available() > 0) {  // If data is available,
    val = myPort.read();         // read it and store it in val
  }
  
  
  background(200);             // Set background to white
  
 
  if (val == 1) {    
    spacebrewConnection.send("select","selecting");
    // If the serial value is 1 (a PAT)
   background(0, 10,20);
 fill(c);
 rect(0, 0, 100, 100);
  } 
 
  if(val > 2) {   
 spacebrewConnection.send("scroll","scrolling");    // If the serial value is not 0,
     background(100, 0,0);
    fill(val);                 // the time elapsed during the PET will pass in as int "val" 
    rect(50, 50, val, val);
  }
  
}
 
 
void onStringMessage( String name, String value ){
  
  // do something here with the message 
  if(name =="download")
  {
    if(value == "true"){
      // flickr the kitteh
    }else{
      // stop the kittteh
    }
    
  }else{
    
  }
}
