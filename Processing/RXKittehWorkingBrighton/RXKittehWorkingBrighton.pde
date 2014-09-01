import spacebrew.*;


import processing.serial.*;

Serial myPort;  // Create object from Serial class
int val;      // Data received from the serial port
int a;
color c = color(59, 253, 252);

int oldVal = 0;
 
String server = "ws://localhost:9000";
String name = "Kitteh_PROCESSING";
String description = "Testing from processing ";
 
// TAKEN FROM THE SPACEBREW TUTORIAL - JUST MODIFIED TO SIMPLIFY W/O ARDUINO
 
Spacebrew spacebrewConnection;  // Spacebrew connection object
 

void setup() 
{
  size(200, 200);
  String portName = Serial.list()[0];          //Teensy 3.1 is on port 10
  myPort = new Serial(this, portName, 9600);
  
  spacebrewConnection = new Spacebrew( this );
  
  // add each thing you publish to
  spacebrewConnection.addPublish( "selection", "string",true);
  spacebrewConnection.addSubscribe("download","string"); 

 
  // connect to spacebrew
  spacebrewConnection.connect(server, name, description );
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
   
    if(oldVal!=val){
          spacebrewConnection.send("selection","select");
          oldVal = val;
    }
 
  } 

  if(val > 2) {                       // If the serial value is not 0,
    background(100, 0,0);
    fill(val);                 // the time elapsed during the PET will pass in as int "val" 
    rect(50, 50, val, val);
    if(oldVal!=val){
      spacebrewConnection.send("selection","scroll");
      oldVal = val;
    }
  }
  
  if (spacebrewConnection.connected()) {
   // print("spacebrew connected");
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




