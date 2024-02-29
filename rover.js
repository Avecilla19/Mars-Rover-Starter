class Rover {
   // Write code here!
      constructor(position) {
        this.position = position;
        this.mode = 'NORMAL';
        this.generatorWatts = 110;
      }
    
      receiveMessage(message) {
      
        let commands = message.commands
        let result = {
           message : message.name,
           results : [],
            /*It extracts the array of commands from the message object and assigns it to the variable commands.
It initializes an empty array named results inside an object named result, which will store the results of executing the commands.
It iterates over each command in the commands array using a for loop. */
        }
        for (let i = 0; i < commands.length; i++){
           if (commands[i].commandType === 'MOVE'){
              if (this.mode === 'LOW_POWER'){
                 result.results.push({completed: false})
              }else{
              this.position = commands[i].value,
              result.results.push({completed: true})}}
           else if (commands[i].commandType === 'MODE_CHANGE'){
              this.mode = commands[i].value
              result.results.push({completed: true})
           }
           else if (commands[i].commandType === 'STATUS_CHECK'){
              result.results.push( {
                 roverStatus : {
                    mode: this.mode,
                    position : this.position,
                    generatorWatts : this.generatorWatts
                 }
              }
           )}
        }
        return result
        
  
  }
      }
    
    

module.exports = Rover;