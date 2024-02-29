const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  it('constructor sets position and default values for mode and generatorWatts', function(){
    let rover = new Rover(1200)
    expect(rover).toEqual({position: 1200, mode : 'NORMAL', generatorWatts: 110})
  })
  // TEST 8
  it('response returned by receiveMessage contains the name of the message', function(){
    let rover = new Rover(100)
    let commands = [
        new Command('MOVE', 4321),
        new Command('STATUS_CHECK'),
    ];
    let message = new Message('TA power', commands);
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual('TA power')
  })
  //TEST 9
it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
  let rover = new Rover(100);
  let commands = [
     new Command('MOVE', 4321),
     new Command('STATUS_CHECK'),
  ];
  let message = new Message('TA power', commands);
  let response = rover.receiveMessage(message);
  expect(response.results.length).toBe(2)
})
//TEST 10
it("responds correctly to the status check command", function(){
  let rover = new Rover(100);
  let commands = [
     new Command('STATUS_CHECK'),
  ];
  let message = new Message('TA power', commands);
  let response = rover.receiveMessage(message);
  expect(response.results).toEqual([
    {
      roverStatus: { mode: 'NORMAL', position: 100, generatorWatts: 110 }
    }
  ])
})
//TEST 11
it("responds correctly to the mode change command", function(){
  let rover = new Rover(100);
  let commands = [
    new Command('MODE_CHANGE', 'LOW_POWER')
  ];
  let message = new Message('TA power', commands);
  let response = rover.receiveMessage(message);
  expect(rover.mode).toBe('LOW_POWER')
})
//TEST 12
it("responds with a false completed value when attempting to move in LOW_POWER mode", function(){
  let rover = new Rover(100);
  let commands = [
    new Command('MODE_CHANGE', 'LOW_POWER'),
    new Command('MOVE', 3579)
  ];
  let message = new Message('TA power', commands);
  let response = rover.receiveMessage(message);
  expect(response.results[1]).toStrictEqual({completed: false})
})
//TEST 13 I HATE IT HERE LOL
it("responds with the position for the move command", function(){
  let rover = new Rover(100);
  let commands = [
    new Command('MOVE', 3579)
  ];
  let message = new Message('TA power', commands);
  let response = rover.receiveMessage(message);
  expect(rover.position).toBe(3579)
})
});
// The ammount of TYPOS i had is killing me..