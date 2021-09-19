client.on("message", message => {
    const command = message.content.split(" ")[0];
    const args = message.content.split(" ").slice();
  let container = message.content.split(" ");
  let result =  Number(container[1]) + Number(container[3]);
  let result2 = Number(container[1]) - Number(container[3]);
  let result3 = Number(container[1]) * Number(container[3]);
  let result4 = Number(container[1]) / Number(container[3]);
  if(command === "احسب"){
if(!args[3]) return;
if(!args[2]) return;
    if (container[2] === "+") {
        message.channel.send("Answer is " + result);
        } else if (container[2] === "-") {
          message.channel.send("Answer is " + result2);
        } else if (container[2] === "*" || container[2].toLowerCase() === "x" || container[2].toLowerCase() === "×") {
          message.channel.send("Answer is " + result3);
        } else if (container[2] === "/" || container[2].toLowerCase() == "÷") {
          message.channel.send("Answer is " + result4);
        }
        }
});//.catch(console.error);