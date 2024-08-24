// function hi()
// {
// 		console.log('hi'); 
// 		setTimeout(hello, 3000)
// }
// function hello()
// {
// 		console.log('hello');
// 		setTimeout(helloThere, 5000)
// }
// function helloThere(){
// 		console.log('hello there');
// }

// setTimeout(hi, 1000)



// function setTimeoutPromisified(ms)
// {
// 		return new Promise((resolve) => setTimeout(resolve, ms))
// }

// setTimeoutPromisified(1000)
// .then(() => {
// 	console.log('hi');
// 	setTimeoutPromisified(3000)
// 	.then(() => {
// 		console.log('hello');
// 		setTimeoutPromisified(5000)
// 		.then(() => {
// 			console.log('hello there');
// 		});
// 	});
// });



function setTimeoutPromisified(ms)
{
		return new Promise((resolve) => setTimeout(() => resolve(), ms))
}

async function print()
{
	await setTimeoutPromisified(1000);
	console.log('hi');
	await setTimeoutPromisified(3000);
	console.log('hello');
	await setTimeoutPromisified(5000);
	console.log('hello there');
}

print();