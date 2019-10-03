const MainSystem = require("./MainSystem");
const Payment = require("./Payment");
let mainSystem = new MainSystem("Dublin");
mainSystem.displaySections();
mainSystem.selectSection("Hourly", true, "12345");
mainSystem.sections.get("Hourly").scanTicket(1);
mainSystem.startExitProcess(1, "Hourly");
// Why is payment taking a string 10
let payment = new Payment("10", "cash");
// better pass the whole payment object to mainSystem,
// the point of having an object instead of a value is to encapsulate the value with
// related information. How do I tell mainSystem that this is an credit card payment if I don't pass to it?
mainSystem.takePayment(payment.amount, "Hourly", 1);
// console.log(mainSystem);
