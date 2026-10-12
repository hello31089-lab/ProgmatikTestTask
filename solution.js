const calculateExp = (strArr) => {
  if (!strArr || strArr.length === 0) return 0;

  let result = 0;
  let currentOp = "+";

  for (let i = 0; i < strArr.length; i++) {
    const token = strArr[i];

    if (token === "+" || token === "-") {
      if (token === "-") {
        currentOp = currentOp === "+" ? "-" : "+";
      }
    } 
	
    else {
      const num = Number(token);

      if (currentOp === "+") {
        result += num;
      } else if (currentOp === "-") {
        result -= num;
      }

      currentOp = "+";
    }
  }

  return result;
};

function solution(res, how) {
 const allResults = [];
  for (let i = 0; i < 3**10; i++) {
    const actionsNum = i.toString(3).padStart(10, "0");
    let index = 0;
    const resArr = [];
	let lastNumber = 9;
	let hasError = false;
	
	for (let j = 0; j < actionsNum.length; j++) {
		const t = actionsNum[j];
		if(lastNumber<-1) {
			hasError = true;
			break;
		}
		if(t==="0") {
		j===0 ? resArr.push(lastNumber) :
			resArr[index]=([resArr[index],--lastNumber].join(""))
		}
		else {
			resArr.push(t === "1" ? "+" : "-")
			j!==0 && --lastNumber;
			resArr.push(lastNumber);
			index=resArr.length-1;
			}
	}

	if (hasError) continue;

	
		if(!how) {
			try {
				const expression = resArr.join("")
				if(eval(expression)===res) 
					allResults.push(`${expression}=${res}`);
			} catch (e){
				console.log("eval error:", e)
			;}
		} else {
			if(calculateExp(resArr)===res) allResults.push(`${resArr.join("")}=${res}`);
		}
  }
  return allResults;
}
const start= performance.now();
const result = solution(200,1);
const end = performance.now();
console.log(result);

console.log(`Время выполнения: ${end - start} мс`);

