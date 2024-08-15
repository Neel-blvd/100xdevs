const crypto = require('crypto')
let i = 0
while(true)
{
	if(crypto.createHash('sha256').update(`100xdevs${i}`).digest('hex').startsWith('00000'))
		break;
	i++;
}
console.log(`100xdevs${i}`);
